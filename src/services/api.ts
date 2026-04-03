import type { Product } from "../types/Product";

type RawProduct = Record<string, unknown>;

type ProductsResponse = {
  success?: boolean;
  products?: RawProduct[];
};

const PRODUCTS_URL =
  "/api/econverse/teste-front-end/junior/tecnologia/lista-produtos/produtos.json";

let productsCache: Product[] | null = null;
let productsPromise: Promise<Product[]> | null = null;

const fallbackProducts: Product[] = [
  {
    productId: 1,
    productName: "Smartphone Apple iPhone 13",
    descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    photo:
      "https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png",
    price: 15000,
    oldPrice: 15990,
    installmentText: "ou 2x de R$ 49,95 sem juros",
    shippingText: "Frete grátis",
  },
  {
    productId: 2,
    productName: "Smartphone Apple iPhone 13",
    descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    photo:
      "https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png",
    price: 9000,
    oldPrice: 9590,
    installmentText: "ou 2x de R$ 49,95 sem juros",
    shippingText: "Frete grátis",
  },
  {
    productId: 3,
    productName: "Smartphone Apple iPhone 13",
    descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    photo:
      "https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png",
    price: 14990,
    oldPrice: 15990,
    installmentText: "ou 2x de R$ 49,95 sem juros",
    shippingText: "Frete grátis",
  },
  {
    productId: 4,
    productName: "Smartphone Apple iPhone 13",
    descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    photo:
      "https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png",
    price: 12000,
    oldPrice: 12990,
    installmentText: "ou 2x de R$ 49,95 sem juros",
    shippingText: "Frete grátis",
  },
];

function getString(raw: RawProduct, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }
  return undefined;
}

function getNumber(raw: RawProduct, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = raw[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string") {
      const parsed = Number(value.replace(",", "."));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return undefined;
}

function toProduct(raw: RawProduct, index: number): Product | null {
  const productId = getNumber(raw, ["productId", "id"]) ?? index + 1;
  const productName = getString(raw, ["productName", "name"]);
  const descriptionShort =
    getString(raw, ["descriptionShort", "description"]) ?? productName;
  const photo = getString(raw, ["photo", "image", "imageUrl"]);
  const price = getNumber(raw, ["price", "salePrice", "priceTo"]);

  if (
    !productName ||
    !descriptionShort ||
    !photo ||
    price === undefined
  ) {
    return null;
  }

  return {
    productId,
    productName,
    descriptionShort,
    photo,
    price,
    oldPrice: getNumber(raw, ["oldPrice", "listPrice", "priceFrom"]),
    installmentText: getString(raw, ["installmentText", "installments", "paymentText"]),
    shippingText: getString(raw, ["shippingText", "shipping", "freightText"]),
  };
}

async function fetchAndNormalizeProducts(): Promise<Product[]> {
  try {
    const res = await fetch(PRODUCTS_URL);

    if (!res.ok) {
      throw new Error(`Falha ao carregar produtos: HTTP ${res.status}`);
    }

    const data = (await res.json()) as ProductsResponse;

    if (!Array.isArray(data.products)) {
      throw new Error("Formato de resposta inválido: 'products' não é um array.");
    }

    const normalizedProducts = data.products
      .map((product, index) => toProduct(product, index))
      .filter((product): product is Product => product !== null);

    if (normalizedProducts.length === 0) {
      throw new Error("Nenhum produto válido retornado pela API.");
    }

    productsCache = normalizedProducts;
    return normalizedProducts;
  } catch (error) {
    console.warn("API indisponível no momento. Exibindo fallback local.", error);
    productsCache = fallbackProducts;
    return fallbackProducts;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (productsCache) {
    return productsCache;
  }

  if (!productsPromise) {
    productsPromise = fetchAndNormalizeProducts().finally(() => {
      productsPromise = null;
    });
  }

  return productsPromise;
}
