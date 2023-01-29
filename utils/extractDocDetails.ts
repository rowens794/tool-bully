//extract any data between leading and ending --- in the mdx file
export const extractDocDetails = (file: string) => {
  const docDetails = file.split("---")[1].split("\n");
  const docDetailsObj: { [key: string]: string } = {};

  docDetails.forEach((detail) => {
    const [key, value] = detail.split(":");
    if (key && value) docDetailsObj[key.trim()] = value.trim();
  });

  return docDetailsObj;
};
