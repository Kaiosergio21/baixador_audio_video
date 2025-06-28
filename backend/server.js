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

  if (!url || !tipo) {
    return res.status(400).send('Parâmetros inválidos');
  }

  const nomeArquivo = tipo === 'audio' ? 'audio.mp3' : 'video.mp4';
  const arquivoSaida = path.join(__dirname, nomeArquivo);

  // Exclui arquivo anterior, se existir
  if (fs.existsSync(arquivoSaida)) {
    fs.unlinkSync(arquivoSaida);
  }

  const ytDlpPath = 'C:\\yt-dlp\\yt-dlp.exe'; // Caminho do yt-dlp
  const ffmpegPath = 'C:\\ffmpeg\\bin';       // Caminho da pasta bin do ffmpeg

  const formato = tipo === 'audio'
    ? 'bestaudio'
    : 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4';

  const processo = spawn(ytDlpPath, [
    '-f', formato,
    '--ffmpeg-location', ffmpegPath,
    '-o', arquivoSaida,
    url
  ]);

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
      res.status(500).send('Falha ao baixar vídeo');
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
