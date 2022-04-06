window.onload = () => {
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    covertCurrency();
  });
}

async function covertCurrency() {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const amount = parseFloat(formData.get('amount'));
  const fromCurrency = formData.get('from');
  const toCurrency = formData.get('to');
  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`;
  document.querySelector('#result').innerHTML = 'Se încarcă...';
  try {
    const result = await fetch(url);
    const rate = await result.json();
    const convertedAmount = (amount * rate[toCurrency]).toFixed(2);
    document.querySelector('#result').innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    document.querySelector('#result').innerHTML = "A apărut o eroare!";
  }
}