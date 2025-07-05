const express = require('express');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/download', (req, res) => {
  const { url, tipo } = req.query;

  const timestamp = Date.now();






  if (!url || !tipo) {
    return res.status(400).send('Parâmetros inválidos');
  }
const nomeArquivo = tipo === 'audio' ? `audio-${timestamp}.mp3` : `video-${timestamp}.mp4`;
  const arquivoSaida = path.join(__dirname, nomeArquivo);

  // Exclui arquivo anterior, se existir
  if (fs.existsSync(arquivoSaida)) {
    fs.unlinkSync(arquivoSaida);
  }

  const ytDlpPath = 'C:\\yt-dlp\\yt-dlp.exe'; // Caminho do yt-dlp
  const ffmpegPath = 'C:\\ffmpeg\\bin';       // Caminho da pasta bin do ffmpeg

  let processo;

  if (tipo === 'audio') {
    processo = spawn(ytDlpPath, [
      url,
      '--extract-audio',
      '--audio-format', 'mp3',
      '--ffmpeg-location', ffmpegPath,
      '-o', arquivoSaida
    ]);
  } else {
   const formato = 'bv+ba/best';

processo = spawn(ytDlpPath, [
  '-f', formato,
  '--merge-output-format', 'mp4', // força a junção em MP4
  '--ffmpeg-location', ffmpegPath,
  '-o', arquivoSaida,
  url
]);

  
  }

  processo.stderr.on('data', data => {
    console.error(`yt-dlp stderr: ${data}`);
  });

  processo.on('close', code => {
    if (code === 0) {
      res.download(arquivoSaida, nomeArquivo, err => {
        if (err) {
          console.error('Erro ao enviar arquivo:', err);
        } else {
          fs.unlinkSync(arquivoSaida); // apaga após envio
        }
      });
    } else {
      res.status(500).send('Falha ao baixar o arquivo');
    }
  });

  processo.on('error', err => {
    console.error('Erro ao executar yt-dlp:', err);
    res.status(500).send('Erro ao executar yt-dlp');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 
