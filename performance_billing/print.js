const invoices = require('./invoices.json');
const plays = require('./plays.json');

function statement(invoice) {
   let result = `Statement for ${invoice.customer}\n`;

   function totalAmount() {
      let result = 0;
      for (let perf of invoice.performances) {
         result += amountFor(perf);
      }
      return result;
   }

   function totalVolumeCredits() {
      let result = 0;
      for (let perf of invoice.performances) {
         result += volumeCreditsFor(perf);
      }
      return result; 
   }

   for (let perf of invoice.performances) {
      result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
   }

   result += `Amount owed is ${usd(totalAmount())}\n`;
   result += `You earned ${totalVolumeCredits()} credits\n`;
   return result;


   function usd(number) {
      return new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
         minimumFractionDigits: 2
      }).format(number/100);
   }   

   function volumeCreditsFor(aPerformance) {
      let result = 0;
      result += Math.max(aPerformance.audience - 30, 0);
      // add extra credit for every ten comedy attendees
      if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
      return result;
   }

   function playFor(aPerformance) {
      return plays[aPerformance.playID];
   }

   function amountFor(aPerformance) {
      let result = 0;
      switch (playFor(aPerformance).type) {
         case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
               result += 1000 * (aPerformance.audience, 30);
            }
            break;
         case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
               result += 10000 + 500 * (aPerformance.audience, 20);
            }
            result += 300 * aPerformance.audience;
            break;
         default:
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
      }
      return result;
   }
}

for (let invoice of invoices) {
   console.log(statement(invoice, plays));
}
