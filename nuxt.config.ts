export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    "@/assets/scss/head-foot.scss",
    "@/assets/scss/home.scss"
  ],
  components: [
    { path: "@/components/layout", prefix: "Layout" },
    { path: "@/components/ui", prefix: "Ui" },
    { path: "@/components/sections", prefix: "Section" },
  ],
});