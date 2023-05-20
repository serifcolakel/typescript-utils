const expandHexColor = (hexColor: string): string => {
  // If the hex color is in the abbreviated format (e.g. #ccc),
  // expand it to the full format (e.g. #cccccc)
  return (
    "#" +
    hexColor[1] +
    hexColor[1] +
    hexColor[2] +
    hexColor[2] +
    hexColor[3] +
    hexColor[3]
  );
};

function calculateWeightedColorValue(
  colorValue: number,
  weight: number
): number {
  // Divide the color value by 500, then multiply by the weight
  // to get the weighted color value.
  return Math.round((colorValue * weight) / 500);
}

function componentToHex(colorComponent: number): string {
  // Convert a color component to its hex value
  const hex = colorComponent.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function generateHexColorWithWeight(hexColor: string, weight: number): string {
  // Given a hex color and a weight, generate a weighted hex color
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);

  const weightedRed = calculateWeightedColorValue(red, weight);
  const weightedGreen = calculateWeightedColorValue(green, weight);
  const weightedBlue = calculateWeightedColorValue(blue, weight);

  const weightedHexColor = `#${componentToHex(weightedRed)}${componentToHex(
    weightedGreen
  )}${componentToHex(weightedBlue)}`;

  return weightedHexColor;
}

function isValidHexColor(hexColor: string): boolean {
  // Check if the hex color is valid
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(hexColor);
}

function generateColorPalette(hexColor: string): Record<number, string> {
  if (!isValidHexColor(hexColor)) {
    throw new Error("Invalid hex color string");
  } else if (hexColor.length === 4 && hexColor[0] === "#") {
    hexColor = expandHexColor(hexColor);
  }

  const weights = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const palette: Record<number, string> = {};

  for (const weight of weights) {
    palette[weight] = generateHexColorWithWeight(hexColor, weight);
  }

  return palette;
}

const hexColorString = "#ccc";
try {
  const colorPalette = generateColorPalette(hexColorString);
  console.log(colorPalette);
} catch (error: any) {
  console.error(error.message);
}
