function filterTable(category) {
  let table = document.getElementById("sparepartTable");
  let tr = table.getElementsByTagName("tr");
  let buttons = document.getElementsByClassName("btn-filter");

  // 1. Mengubah Tampilan Tombol Aktif
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
    // Menggunakan .trim() untuk menghapus spasi bawaan dari icon
    if (buttons[i].innerText.toLowerCase().trim() === category) {
      buttons[i].classList.add("active");
    }
  }

  // 2. Membuat Filter Baris Tabel
  for (let i = 1; i < tr.length; i++) {
    let productCat = tr[i].getAttribute("data-category");

    if (category === "semua" || productCat === category) {
      tr[i].style.display = ""; // Tampilkan baris
    } else {
      tr[i].style.display = "none"; // Sembunyikan baris
    }
  }
}

function toggleCSChat() {
  const chatBox = document.getElementById("csChatBox");
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
  scrollToBottom();
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const inputElement = document.getElementById("csInputText");
  const messageText = inputElement.value.trim();

  if (messageText === "") return;

  appendMessage(messageText, "user");
  inputElement.value = "";

  setTimeout(() => {
    generateBotResponse(messageText);
  }, 1000); // Dijeda 1 detik agar simulasi mengetik lebih natural
}

function sendQuickReply(text) {
  appendMessage(text, "user");
  setTimeout(() => {
    generateBotResponse(text);
  }, 600);
}

function appendMessage(text, sender) {
  const chatBody = document.getElementById("csChatBody");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("cs-msg", sender === "user" ? "msg-user" : "msg-bot");
  msgDiv.innerHTML = text;

  chatBody.appendChild(msgDiv);
  scrollToBottom();
}

function scrollToBottom() {
  const chatBody = document.getElementById("csChatBody");
  chatBody.scrollTop = chatBody.scrollHeight;
}

function generateBotResponse(userText) {
  const text = userText.toLowerCase();
  let reply = "";

  if (
    text.includes("barang") ||
    text.includes("ready") ||
    text.includes("stok")
  ) {
    reply =
      "Saat ini produk dan kelengkapan di CingMotor sebagian besar ready stock, kak! Kakak sedang mencari barang atau aksesoris spesifik apa?";
  } else if (
    text.includes("lokasi") ||
    text.includes("alamat") ||
    text.includes("toko")
  ) {
    reply =
      "Toko kami berlokasi di area Kota Medan. Kami buka setiap Senin-Sabtu dari jam 08.00 s/d 17.00 WIB. Silahkan datang langsung ya!";
  } else {
    reply =
      "Maaf, sistem otomatis kami belum mengenali pertanyaan tersebut. Mohon tunggu sebentar atau kakak bisa <a href='https://wa.me/628123456789' target='_blank' style='color:#d35400; font-weight:bold;'>Hubungi Admin via WhatsApp</a> untuk respon langsung.";
  }

  appendMessage(reply, "bot");
}
