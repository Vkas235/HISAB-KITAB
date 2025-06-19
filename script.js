let entries = JSON.parse(localStorage.getItem("ledger") || "[]");

function updateUI() {
  let balance = 0;
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = '';
  
  entries.forEach((e, i) => {
    let li = document.createElement('li');
    li.className = e.type;
    li.innerHTML = `
      <span>${e.desc} - ₹${e.amount} (${e.type === "credit" ? "इनकम" : "खर्च"})</span>
      <button class="deleteBtn" onclick="deleteEntry(${i})">🗑️</button>
    `;
    historyList.appendChild(li);
    balance += (e.type === "credit" ? 1 : -1) * Number(e.amount);
  });

  document.getElementById("balance").textContent = balance;
}

function addEntry(e) {
  e.preventDefault();
  const desc = document.getElementById("desc").value.trim();
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  if (desc && amount) {
    entries.push({ desc, amount, type });
    localStorage.setItem("ledger", JSON.stringify(entries));
    updateUI();
    document.getElementById("entryForm").reset();
  }
}

function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("ledger", JSON.stringify(entries));
  updateUI();
}

function clearAll() {
  if (confirm("क्या आप सारा डेटा हटाना चाहते हैं?")) {
    entries = [];
    localStorage.removeItem("ledger");
    updateUI();
  }
}

document.getElementById("entryForm").addEventListener("submit", addEntry);
document.getElementById("clearAll").addEventListener("click", clearAll);

updateUI();