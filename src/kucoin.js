import _ from "https://deno.land/std@0.120.0/node/module.ts";

const httpGet = async (url) => {
    const data = await fetch(url).then(data => data.json());
    return data;
}

/* 
	* @params {string} symbols - the symbols token: '["[\"USDT\", \"UTK\"]"]'
	*/

const main = async (symbols) => {
    const responses = [];
    const listSymbols = JSON.parse(JSON.parse(symbols)[0]);
    const urls = listSymbols.map(symbol => `https://api.kucoin.com/api/v1/prices?currencies=${symbol}`);
    for (let i = 0; i < urls.length; i++) {
        const result = await httpGet(urls[i]);
        if (listSymbols[i] in result.data) {
            responses.push({
                name: listSymbols[i],
                prices: [result.data[listSymbols[i]]]
            });
        }
    }
    console.log(JSON.stringify(responses))
};

main(...process.argv.slice(2))
