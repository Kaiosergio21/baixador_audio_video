# 🎬 YouTube Downloader (Node.js + yt-dlp + ffmpeg)

Este projeto é uma aplicação web simples para baixar vídeos ou áudios do YouTube. Desenvolvido em Node.js com `yt-dlp` e `ffmpeg`, permite ao usuário inserir uma URL de vídeo e escolher entre baixar o **áudio (.mp3)** ou o **vídeo completo (.mp4)**.

---

## ⚙️ Tecnologias Utilizadas

- Node.js
- Express.js
- yt-dlp (substituto moderno do youtube-dl)
- ffmpeg (para combinar áudio + vídeo)
- HTML/CSS (frontend simples)
- child_process e fs (Node.js nativo)

---

## 🚀 Funcionalidades

- ✅ Baixar vídeo completo do YouTube (.mp4)
- ✅ Baixar apenas o áudio do vídeo (.mp3)
- ✅ Merge automático de vídeo + áudio via ffmpeg
- ✅ Interface simples via navegador
- ✅ Backend leve e eficiente

---

## 📁 Estrutura do Projeto

youtube-downloader/
├── backend/
│ └── server.js
├── frontend/
│ ├── index.html
│ ├── script.js
│ └── style.css
├── README.md
├── .gitignore



---

## 🛠 Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp#installation)
- [ffmpeg](https://ffmpeg.org/download.html)

> ⚠️ Certifique-se de que `yt-dlp` e `ffmpeg` estejam acessíveis pelo sistema (ou configure os caminhos absolutos no código).

---

## ▶️ Como executar localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/youtube-downloader.git
cd youtube-downloader

nstale as dependências:

bash
Copiar
Editar
cd backend
npm install
Execute o servidor:

bash
Copiar
Editar
node server.js
Acesse no navegador:

arduino
Copiar
Editar
http://localhost:3000
🌐 Deploy
Para disponibilizar publicamente, recomenda-se:

VPS com Linux (ex: Oracle Cloud, DigitalOcean)

Docker + Fly.io ou Railway

Exposição local com ngrok para testes temporários

⚠️ Plataformas como Render, Vercel e Netlify não suportam yt-dlp ou ffmpeg diretamente.

🧾 Licença
Este projeto é de uso livre e educacional. Use com responsabilidade.


yaml
Copiar
Editar

---

## 📝 Arquivos adicionais úteis

### 📄 `.gitignore` (essencial para evitar enviar os arquivos temporários)

```gitignore
node_modules/
*.mp4
*.mp3
.env
