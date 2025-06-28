function baixar(tipo) {
  const url = document.getElementById('videoUrl').value;

  fetch(`http://localhost:3000/download?url=${encodeURIComponent(url)}&tipo=${tipo}`)
    .then(res => {
      if (res.ok) return res.blob();
      else throw new Error("Erro ao baixar");
     

    })
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = tipo === 'audio' ? 'audio.mp3' : 'video.mp4';
      a.click();
    })
    .catch(err => alert(err.message));
}
