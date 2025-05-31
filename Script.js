const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let input = '';

const operators = {
  '÷': '/',
  '×': '*',
  '−': '-',
  '+': '+',
  'π': 'Math.PI',
  '√': 'Math.sqrt',
  '^': '**',
  '%': '/100',
  '!': 'factorial',
};

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;

    if (value === 'AC') {
      input = '';
    } else if (value === '⌫') {
      input = input.slice(0, -1);
    } else if (value === '=') {
      try {
        let expr = input;

        if (expr.includes('!')) {
          expr = expr.replace(/(\d+)!/g, (_, n) => factorial(Number(n)));
        }

        for (const [key, val] of Object.entries(operators)) {
          if (key !== '√') {
            expr = expr.replaceAll(key, val);
          }
        }

        // Handle square root separately
        expr = expr.replace(/√(\d+(\.\d+)?|\([^()]*\))/g, (match, group) => `Math.sqrt(${group})`);


        input = eval(expr).toString();
      } catch {
        input = 'Error';
      }
    } else {
      input += value;
    }

    display.innerText = input || '0';
  });
});
