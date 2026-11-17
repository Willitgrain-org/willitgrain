/**
 * Feature switches.
 *
 * SHOP_ENABLED: The shop (Snipcart) is parked until it is ready to launch.
 * While false, /shop and /de/shop are not built, the header shows no shop
 * link and the Snipcart script/stylesheet are not loaded. The shop code itself
 * lives in src/components/pages/ShopPage.astro and src/shop/.
 * To launch it, set this to true (and replace the placeholder products).
 */
export const SHOP_ENABLED = false
