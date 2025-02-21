export default defineCachedEventHandler(
  async () => {
    const flags: Record<string, string> = await $fetch(
      "https://flagcdn.com/en/codes.json"
    );

    let flagsInArray = Object.entries(flags).map(([code, name]) => ({
      code,
      name,
      img: `https://flagcdn.com/w2560/${code}.png`,
    }));

    flagsInArray = flagsInArray.filter((f) => !f.code.includes("us-"));

    return flagsInArray;
  },
  {
    maxAge: 60 * 60 * 5,
  }
);
