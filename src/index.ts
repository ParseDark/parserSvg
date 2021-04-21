const templatePath = "./src/template.t";
const templateFlag1 = "<----Svgtemplate---->";
const templateFlag2 = "<----Nametemplate---->";
const outputDir = "./src/icon";

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

const isSvgFile = (name: string) => /svg$/.test(name);

let firstUpperCase = ([first, ...rest]: any) =>
  first.toUpperCase() + rest.join("");

const cleanFileSuffix = (name: string) => {
  const nameArr = name.split(".").reverse();
  nameArr.shift();
  console.log("namearr", nameArr, "\n");
  console.log("name", name);
  return firstUpperCase(nameArr.join("."));
};

const getSvgContent = async (filePath: string) => {
  const data = await Deno.readFile(filePath);
  const str = decoder.decode(data);
  const newStr = str.replace(/\<svg.+?\>/, "").replace(/\<\/svg\>/, "");
  return newStr;
};

const insertToTemplate = async (data: any, name: string) => {
  const IconName = `${name}Icon`;
  const templateData = await Deno.readFile(templatePath);
  const templateStr = decoder.decode(templateData);
  return templateStr
    .replace(templateFlag1, data)
    .replace(templateFlag2, IconName);
};

const createNewFile = async (name: string, data: any) => {
  const newFilePath = `${outputDir}/${name}.tsx`;
  const encodeData = encoder.encode(data);
  console.log(newFilePath);
  await Deno.create(newFilePath);
  await Deno.writeFile(newFilePath, encodeData);
};

const run = async () => {
  const baseFold = "./src/icons/";

  for await (const dirEntry of Deno.readDir(baseFold)) {
    if (!isSvgFile(dirEntry.name)) continue;
    console.log(dirEntry.name);
    console.log(dirEntry);
    const filePath = baseFold + dirEntry.name;
    const name = cleanFileSuffix(dirEntry.name);
    const svgData = await getSvgContent(filePath);
    const coveredData = await coverToJSX(svgData);
    const newData = await insertToTemplate(coveredData, name);
    await createNewFile(name, newData);
  }
};

const coverToJSX = async (str: string) => {
  console.log(str);
  console.log(typeof str);
  const res = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      htmlStr: str,
    }),
  });
  const body = await res?.json();
  console.log(JSON.stringify(body));
  return body.jsx;
};

run();
