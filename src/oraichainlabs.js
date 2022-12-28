import _ from "https://deno.land/std@0.120.0/node/module.ts";

const httpGet = async (url) => {
    const data = await fetch(url).then(data => data.json());
    return data;
}

const main = async (symbols) => {
    const responses = [];
    const listSymbols = JSON.parse(JSON.parse(symbols)[0]);
    const url = listSymbols.filter(symbol => symbol === "ORAI").map(symbol => `https://pricefeed.oraichainlabs.org/`)
    const fetchData = await httpGet(url);
    responses.push({
      name: fetchData.token,
      prices: [fetchData.price.toFixed(8).toString()]
    })
  
    console.log(JSON.stringify(responses))
};

main(...process.argv.slice(2))
