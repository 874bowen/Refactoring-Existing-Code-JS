# Refactoring-Existing-Code-JS

Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

## Steps in Refactoring

### 1. Ensure you have a solid suite of tests for that section of code - compile -> test -> commit

Its a nice cosing standard to call the value returned in a function result

With a dynamically typed language such as JavaScript, it’s useful to keep track of types—hence, my default name for a parameter includes the type name.

> Never be afraid to change names to improve clarity

e.g.,

```javascript
function amountFor(perf, plays)
// refactored to
function amountFor(aPerformance, plays)
```

If say you have a variable and it is not being updated it is more professional and easy to call the function instead of assigning it to a variable

e.g.,

```javascript
for (let perf of invoice.performances) {
	let thisAmount = amountFor(perf);
	volumeCredits += Math.max(perf.audience, 30, 0);
	if ("comedy" === playFor(perf).type)
		volumeCredits += Math.floor(perf.audience / 5);
	result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${
		perf.audience
	} seats)\n`;
	totalAmount += thisAmount;
}

// refactored to

for (let perf of invoice.performances) {
   // remove thisAmount
   volumeCredits += Math.max(perf.audience, 30, 0);
   ...
   result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
   totalAmount += amountFor(perf);
}
```

Naming is both important and tricky. Breaking a large function into smaller ones only adds value if the names are good. With good names, I don’t have to read the body of the function to see what it does. But it’s hard to get names right the first time, so I use thebest name I can think of for the moment, and don’t hesitate to rename it later. Often, it takes a second pass through some code to realize what the best name really is. For example, a function that formats a number to usd currency at first you can call it `format`, but it doesn't explain much about it hence you can rename it to `formatAsUSD` but with much further thinking would be a bit too long­winded since it’s being used in a string template. This we come up with `usd` as the most suitable. After thinking don’t hesitate to rename it later.

```javascript
result += `Amount owed is ${usd(totalAmount / 100)}\n`;
```

In the print.js you'll notice we have two loops doing the same thing. Which could be solved using one to improved. Refactor first then check on performance.
> Performance with refactoring is: Most of the time you should ignore it. If your refactoring introduces performance slow­downs, finish refactoring first and do performance tuning afterwards.


Small steps and -commits are the key to moving quickly, particularly when
working with difficult code
> Refactoring changes the programs in small steps, so if you make a mistake, it is easy to find where the bug is.
