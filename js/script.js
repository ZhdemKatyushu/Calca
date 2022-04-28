let salaryInput = document.querySelector(".calc_salary");
let currecyDD = document.querySelector(".currency");
let groupDD = document.querySelector(".group");
let details = document.querySelector(".details");
let result = document.querySelector(".result");
let dollarBlock = document.querySelector(".dollar_by_default");
let euroBlock = document.querySelector(".euro_by_default");
let currencyDollarBuyText = document.querySelector(".dollar_by_default > .buy");
let currencyEuroBuyText = document.querySelector(".euro_by_default > .buy");
let currencyDollarSaleText = document.querySelector(
  ".dollar_by_default > .sale"
);
let currencyEuroSaleText = document.querySelector(".euro_by_default > .sale");
let esv2021FirstGroupText = document.querySelector(".esv > .value");
let en2022FirstGroupText = document.querySelector(".en > .value");
let exchangeBaseEndpoint =
  "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";

let en2022FirstGroup = "248.1";
let esv2021FirstGroup = "1430";
let esv2021SecondAndThirdGroup = "1474";
let en2022SecondGroup = "248.1";
let en2022ThirdGroup = "5";

let getExchangeCours = async () => {
  let endpoint = exchangeBaseEndpoint;
  let response = await fetch(endpoint);
  let exchangeCours = await response.json();
  return exchangeCours;
};

let dollarBuy, dollarSale;

const exchangeForDollar = async () => {
  let exchange = await getExchangeCours();
  dollarBuy = exchange[0].buy;
  dollarSale = exchange[0].sale;

  let dollarB = dollarBuy.slice(0, 5);
  let dollarS = dollarSale.slice(0, 5);
  currencyDollarBuyText.textContent = "$ " + dollarB;
  currencyDollarSaleText.textContent = " / " + dollarS;
};

let euroBuy, euroSale;

const exchangeForEuro = async () => {
  let exchange = await getExchangeCours();
  euroBuy = exchange[1].buy;
  euroSale = exchange[1].sale;
  euroB = euroBuy.slice(0, 5);
  euroS = euroSale.slice(0, 5);
  currencyEuroBuyText.textContent = String.fromCharCode(8364) + " " + euroB;
  currencyEuroSaleText.textContent = " / " + euroS;
};

document.addEventListener("load", exchangeForDollar(), exchangeForEuro());

salaryInput.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13) {
    if (currecyDD.value == "UAH") {
      unitedCalculationForUAH(groupDD.value);
    } else if (currecyDD.value == "USD") {
      unitedCalculationForUSD(groupDD.value);
    } else if (currecyDD.value == "EUR") {
      unitedCalculationForEUR(groupDD.value);
    }
  }
});

const updateFirstGroup = () => {
  esv2021FirstGroupText.textContent = esv2021FirstGroup;
  en2022FirstGroupText.textContent = en2022FirstGroup;
};

const updateEsvAndEnSecondGroup = () => {
  esv2021FirstGroupText.textContent = esv2021SecondAndThirdGroup;
  en2022FirstGroupText.textContent = en2022SecondGroup;
};

const updateEsvAndEnThirdGroup = () => {
  esv2021FirstGroupText.textContent = esv2021SecondAndThirdGroup;
  en2022FirstGroupText.textContent = en2022ThirdGroup + "%";
};

groupDD.addEventListener("change", async (e) => {
  const currecy = currecyDD.value;
  switch (e.target.value) {
    case "1": {
      updateFirstGroup();
      break;
    }
    case "2": {
      updateEsvAndEnSecondGroup();
      break;
    }

    case "3": {
      updateEsvAndEnThirdGroup();
      break;
    }
  }
  callCurrencyCalculations(currecy, e.target.value);
});

currecyDD.addEventListener("change", async (e) => {
  switch (e.target.value) {
    case "UAH": {
      console.log("SHOULD BE UAH", e.target.value);
      unitedCalculationForUAH(groupDD.value);
      break;
    }
    case "USD": {
      console.log("SHOULD BE USD", e.target.value);
      unitedCalculationForUSD(groupDD.value);
      break;
    }
    case "EUR": {
      console.log("SHOULD BE EUR", e.target.value);
      unitedCalculationForEUR(groupDD.value);
      break;
    }
  }
});

const callCurrencyCalculations = (currecy, group) => {
  if (currecy == "UAH") return unitedCalculationForUAH(group);
  if (currecy == "USD") return unitedCalculationForUSD(group);
  if (currecy == "EUR") return unitedCalculationForEUR(group);
};

const unitedCalculationForEUR = (group) => {
  let calculation = "";
  let detailsText = "";
  const euroB = euroBuy.slice(0, 5);
  const euroS = euroSale.slice(0, 5);

  if (group === "1") {
    calculation =
      salaryInput.value * euroB - en2022FirstGroup - esv2021FirstGroup;
    detailsText = `${salaryInput.value} * ${euroB} - ${en2022FirstGroup}(EN) - ${esv2021FirstGroup}(ESV)`;
  }
  if (group === "2") {
    calculation =
      salaryInput.value * euroB -
      en2022SecondGroup -
      esv2021SecondAndThirdGroup;
    detailsText = `${salaryInput.value} * ${euroB} - ${en2022SecondGroup}(EN) - ${esv2021SecondAndThirdGroup}(ESV)`;
  }
  if (group === "3") {
    const euroToHryvna = salaryInput.value * euroB;
    const procent = (euroToHryvna / 100) * 5;
    calculation = euroToHryvna - procent - esv2021SecondAndThirdGroup;
    detailsText = `${salaryInput.value} * ${euroB} - ${en2022ThirdGroup}%(EN) - ${esv2021SecondAndThirdGroup}(ESV)`;
  }

  currencyEuroBuyText.textContent = String.fromCharCode(8364) + " " + euroB;
  currencyEuroSaleText.textContent = " / " + euroS;
  euroBlock.style.display = "block";
  dollarBlock.style.display = "none";
  details.textContent = detailsText;
  result.textContent = "You will save = " + calculation;
};

const unitedCalculationForUSD = (group) => {
  let calculation = "";
  let detailsText = "";
  const dollarB = dollarBuy.slice(0, 5);
  const dollarS = dollarSale.slice(0, 5);

  if (group === "1") {
    calculation =
      salaryInput.value * dollarB - en2022FirstGroup - esv2021FirstGroup;
    detailsText = `${salaryInput.value} * ${dollarB} - ${en2022FirstGroup}(EN) - ${esv2021FirstGroup}(ESV)`;
  }
  if (group === "2") {
    calculation =
      salaryInput.value * dollarB -
      en2022SecondGroup -
      esv2021SecondAndThirdGroup;
    detailsText = `${salaryInput.value} * ${dollarB} - ${en2022SecondGroup}(EN) - ${esv2021SecondAndThirdGroup}(ESV)`;
  }
  if (group === "3") {
    const dollarToHryvna = salaryInput.value * dollarB;
    const procent = (dollarToHryvna / 100) * 5;
    calculation = dollarToHryvna - procent - esv2021SecondAndThirdGroup;
    detailsText = `${salaryInput.value} * ${dollarB} - ${en2022ThirdGroup}%(EN) - ${esv2021SecondAndThirdGroup}(ESV)`;
  }

  currencyDollarBuyText.textContent = "$ " + dollarB;
  currencyDollarSaleText.textContent = " / " + dollarS;
  euroBlock.style.display = "none";
  dollarBlock.style.display = "block";
  details.textContent = detailsText;
  result.textContent = "You will save = " + calculation;
};

const unitedCalculationForUAH = (group) => {
  let calculation = "";
  let detailsText = "";

  if (group === "1") {
    calculation = salaryInput.value - en2022FirstGroup - esv2021FirstGroup;
    detailsText = `${salaryInput.value} - ${en2022FirstGroup}(EN) - ${esv2021FirstGroup}(ESV)`;
  }
  if (group === "2") {
    calculation =
      salaryInput.value - en2022SecondGroup - esv2021SecondAndThirdGroup;
    detailsText = `${salaryInput.value} - ${en2022SecondGroup}(EN) - ${esv2021SecondAndThirdGroup}(ESV)`;
  }
  if (group === "3") {
    const procent = (salaryInput.value / 100) * en2022ThirdGroup;
    calculation = salaryInput.value - procent - esv2021SecondAndThirdGroup;
    detailsText = `${salaryInput.value} - ${en2022ThirdGroup}%(EN) - ${esv2021SecondAndThirdGroup}(ESV)`;
  }

  euroBlock.style.display = "none";
  dollarBlock.style.display = "none";
  details.textContent = detailsText;
  result.textContent = "You will save = " + calculation;
};
