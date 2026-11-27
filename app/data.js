// NusaStat data module.
// Every figure below is a real published statistic. Each series, headline and
// table entry carries its source and its year, and the pages print both next
// to the number. Years run 2015-2024 unless a series says otherwise.

const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Ten-year series from the World Bank's World Development Indicators.
const SERIES = {
  population: { title: "Total population", unit: "people", source: "World Bank", year: 2024,
    values: [261799249, 264627418, 267346658, 269951846, 272489381, 274814866, 276758053, 278830529, 281190067, 283487931] },
  popGrowth: { title: "Population growth", unit: "% per year", source: "World Bank", year: 2024,
    values: [1.12, 1.07, 1.02, 0.97, 0.94, 0.85, 0.70, 0.75, 0.84, 0.81] },
  gdpUsd: { title: "GDP, current US dollars", unit: "US$ billion", source: "World Bank", year: 2024,
    values: [860.9, 931.9, 1015.6, 1042.3, 1119.1, 1059.1, 1186.5, 1319.1, 1371.2, 1396.3] },
  gdpPpp: { title: "GDP, purchasing power parity", unit: "int$ billion", source: "World Bank", year: 2024,
    values: [2625.2, 2715.8, 2857.3, 3070.0, 3266.2, 3223.4, 3530.6, 3982.4, 4338.3, 4669.8] },
  gdpPerCapita: { title: "GDP per person, current US dollars", unit: "US$", source: "World Bank", year: 2024,
    values: [3288, 3521, 3799, 3861, 4107, 3854, 4287, 4731, 4876, 4925] },
  gniPppPerCapita: { title: "GNI per person, PPP", unit: "int$", source: "World Bank", year: 2024,
    values: [9690, 9930, 10350, 11030, 11620, 11410, 12410, 13900, 15020, 16050] },
  gdpGrowth: { title: "Real GDP growth", unit: "% per year", source: "World Bank", year: 2024,
    values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03] },
  cpiInflation: { title: "Consumer price inflation, annual average", unit: "% per year", source: "World Bank", year: 2024,
    values: [6.36, 3.53, 3.81, 3.20, 3.03, 1.92, 1.56, 4.21, 3.67, 2.18] },
  exportsShare: { title: "Exports of goods and services", unit: "% of GDP", source: "World Bank", year: 2024,
    values: [21.16, 19.09, 20.18, 21.00, 18.59, 17.33, 21.42, 24.50, 21.81, 22.31] },
  importsShare: { title: "Imports of goods and services", unit: "% of GDP", source: "World Bank", year: 2024,
    values: [20.78, 18.33, 19.18, 22.07, 19.04, 15.64, 18.79, 20.96, 19.65, 20.50] },
  unemploymentIlo: { title: "Unemployment, ILO modelled estimate", unit: "% of labour force", source: "World Bank", year: 2024,
    values: [4.51, 4.30, 3.78, 4.39, 3.59, 4.26, 3.83, 3.46, 3.31, 3.30] },
  lifeExpectancy: { title: "Life expectancy at birth", unit: "years", source: "World Bank", year: 2024,
    values: [69.52, 69.73, 69.95, 70.08, 70.35, 68.82, 67.45, 70.93, 71.15, 71.29] },
  infantMortality: { title: "Infant mortality", unit: "deaths per 1,000 live births", source: "World Bank", year: 2024,
    values: [21.9, 21.0, 20.1, 19.3, 18.5, 17.7, 17.0, 16.3, 15.7, 15.2] },
  under5Mortality: { title: "Under-5 mortality", unit: "deaths per 1,000 live births", source: "World Bank", year: 2024,
    values: [26.1, 25.0, 23.8, 22.8, 21.8, 20.8, 19.9, 19.1, 18.4, 17.7] },
  healthSpending: { title: "Current health expenditure", unit: "% of GDP", source: "World Bank", year: 2023, years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    values: [2.92, 3.02, 2.90, 2.87, 2.88, 3.42, 3.71, 2.69, 2.70] },
  fertility: { title: "Fertility rate", unit: "births per woman", source: "World Bank", year: 2024,
    values: [2.35, 2.31, 2.25, 2.22, 2.21, 2.19, 2.17, 2.15, 2.13, 2.12] },
  urbanShare: { title: "Urban population", unit: "% of total population", source: "World Bank", year: 2024,
    values: [53.17, 53.81, 54.45, 55.10, 55.74, 56.28, 56.88, 57.49, 58.12, 58.75] },
  internetUsers: { title: "People using the internet", unit: "% of population", source: "World Bank", year: 2024,
    values: [22.06, 25.45, 32.34, 39.90, 47.69, 53.73, 62.10, 66.48, 69.21, 72.78] },
  mobileSubs: { title: "Mobile phone subscriptions", unit: "per 100 people", source: "World Bank", year: 2024,
    values: [129.5, 145.7, 162.8, 118.3, 125.2, 129.4, 132.2, 122.9, 125.2, 122.5] },
  enrolPrimary: { title: "Primary school enrolment, gross", unit: "%", source: "World Bank", year: 2024,
    values: [107.98, 105.92, 104.38, 103.30, 101.26, 100.95, 100.31, 98.70, 98.16, 100.04] },
  enrolSecondary: { title: "Secondary school enrolment, gross", unit: "%", source: "World Bank", year: 2024,
    values: [87.84, 87.82, 90.95, 92.81, 94.95, 96.93, 97.84, 97.82, 96.00, 98.84] },
  enrolTertiary: { title: "Tertiary school enrolment, gross", unit: "%", source: "World Bank", year: 2023, years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    values: [32.46, 34.83, 35.97, 36.15, 37.32, 38.17, 40.63, 42.33, 44.88] },
  giniWb: { title: "Gini index, World Bank estimate", unit: "index 0-100", source: "World Bank", year: 2024,
    values: [38.2, 36.9, 36.4, 36.3, 35.4, 35.3, 35.5, 35.5, 36.1, 34.9] }
};

// Headline figures for the dashboard. Display strings are written for readers.
const HEADLINES = [
  { id: "population", label: "Population", display: "284.4 million", note: "Mid-year estimate, Statistik Indonesia 2026", source: "BPS", year: 2025 },
  { id: "growth", label: "Economic growth", display: "5.11%", note: "Real GDP growth; 2024 was 5.03%", source: "BPS", year: 2025 },
  { id: "gdppc", label: "GDP per person", display: "US$4,925", note: "Current US dollars", source: "World Bank", year: 2024 },
  { id: "inflation", label: "Inflation", display: "2.92%", note: "Full-year CPI; Dec 2024 year-on-year was 1.57%", source: "BPS", year: 2025 },
  { id: "unemployment", label: "Unemployment", display: "4.75%", note: "Open unemployment rate, August 2026", source: "BPS", year: 2026 },
  { id: "poverty", label: "Poverty rate", display: "8.07%", note: "March 2026; 22.93 million people", source: "BPS", year: 2026 },
  { id: "life", label: "Life expectancy", display: "71.3 years", note: "At birth", source: "World Bank", year: 2024 },
  { id: "hdi", label: "Human Development Index", display: "75.02", note: "Index 0-100", source: "BPS", year: 2024 },
  { id: "internet", label: "Internet users", display: "72.8%", note: "Share of population", source: "World Bank", year: 2024 }
];

// Latest releases from BPS and ministries, newer than the 2015-2024 series.
const BPS_LATEST = [
  { label: "Poverty rate", value: "8.07%", detail: "March 2026, down from 8.25% in September 2025", source: "BPS", year: 2026 },
  { label: "Poor people", value: "22.93 million", detail: "March 2026, down from 24.06 million in September 2024", source: "BPS", year: 2026 },
  { label: "Poverty line", value: "Rp 669,235 / month", detail: "March 2026, up from Rp 595,242 in September 2024", source: "BPS", year: 2026 },
  { label: "Poverty, urban", value: "6.34%", detail: "March 2026", source: "BPS", year: 2026 },
  { label: "Poverty, rural", value: "10.67%", detail: "March 2026", source: "BPS", year: 2026 },
  { label: "Unemployment (TPT)", value: "4.75%", detail: "August 2026; 4.85% in August 2025, 4.91% in August 2024", source: "BPS", year: 2026 },
  { label: "Labour force", value: "155.37 million", detail: "August 2026", source: "BPS", year: 2026 },
  { label: "Average wage", value: "Rp 3,420,000 / month", detail: "August 2026", source: "BPS", year: 2026 },
  { label: "Informal workers", value: "59.4%", detail: "Share of workers, February 2025", source: "BPS", year: 2025 },
  { label: "Gini ratio", value: "0.368", detail: "March 2026", source: "BPS", year: 2026 },
  { label: "Human Development Index", value: "75.02", detail: "2024", source: "BPS", year: 2024 },
  { label: "GDP growth", value: "5.11%", detail: "2025; 5.03% in 2024", source: "BPS", year: 2025 },
  { label: "Inflation, full year", value: "2.92%", detail: "2025; 1.57% year-on-year in December 2024", source: "BPS", year: 2025 },
  { label: "Inflation, September 2026", value: "3.28%", detail: "Year-on-year", source: "BPS", year: 2026 },
  { label: "Budget deficit", value: "2.81% of GDP", detail: "APBN 2025", source: "Ministry of Finance", year: 2025 },
  { label: "Stunting, children under 5", value: "19.8%", detail: "2024, down from 21.5% in 2023", source: "Ministry of Health, SSGI", year: 2024 },
  { label: "PISA mathematics", value: "366", detail: "Mean score", source: "OECD, PISA 2022", year: 2022 },
  { label: "PISA reading", value: "359", detail: "Mean score", source: "OECD, PISA 2022", year: 2022 },
  { label: "PISA science", value: "383", detail: "Mean score", source: "OECD, PISA 2022", year: 2022 }
];

// Ten most populous provinces. BPS interim projection, mid-year 2024.
const PROV_TOP10 = [
  { rank: 1, name: "West Java", pop: 50345.2, share: 17.88 },
  { rank: 2, name: "East Java", pop: 41814.5, share: 14.85 },
  { rank: 3, name: "Central Java", pop: 37892.3, share: 13.46 },
  { rank: 4, name: "North Sumatra", pop: 15588.5, share: 5.54 },
  { rank: 5, name: "Banten", pop: 12431.4, share: 4.41 },
  { rank: 6, name: "Jakarta", pop: 10684.9, share: 3.79 },
  { rank: 7, name: "South Sulawesi", pop: 9463.4, share: 3.36 },
  { rank: 8, name: "Lampung", pop: 9419.6, share: 3.34 },
  { rank: 9, name: "South Sumatra", pop: 8837.3, share: 3.14 },
  { rank: 10, name: "Riau", pop: 6728.1, share: 2.39 }
];
const PROV_TOP10_TOTAL = 281603.8; // thousands, all Indonesia, BPS 2024

// Population density, all 38 provinces. BPS 2024, people per square kilometre.
const PROV_DENSITY = [
  ["Jakarta", 16165], ["West Java", 1359], ["Banten", 1329], ["Yogyakarta", 1186],
  ["Central Java", 1104], ["East Java", 870], ["Bali", 793], ["West Nusa Tenggara", 287],
  ["Lampung", 281], ["Riau Islands", 264], ["North Sumatra", 215], ["South Sulawesi", 209],
  ["North Sulawesi", 186], ["West Sumatra", 139], ["East Nusa Tenggara", 122],
  ["South Kalimantan", 115], ["Bengkulu", 105], ["Gorontalo", 102], ["South Sumatra", 102],
  ["Aceh", 98], ["Bangka Belitung", 92], ["West Sulawesi", 91], ["Southeast Sulawesi", 77],
  ["Jambi", 76], ["Riau", 75], ["Central Sulawesi", 51], ["Maluku", 42],
  ["North Maluku", 41], ["West Kalimantan", 39], ["East Kalimantan", 32],
  ["Highland Papua", 29], ["Central Papua", 24], ["Central Kalimantan", 18],
  ["Southwest Papua", 16], ["Papua", 13], ["North Kalimantan", 11], ["West Papua", 10],
  ["South Papua", 5]
];

// Population by island group. Dukcapil, Ministry of Home Affairs, Semester I 2024.
const ISLANDS = [
  { name: "Java", pop: 157393610, share: 55.93 },
  { name: "Sumatra", pop: 61583691, share: 21.81 },
  { name: "Sulawesi", pop: 20783350, share: 7.36 },
  { name: "Kalimantan", pop: 17454078, share: 6.18 },
  { name: "Bali and Nusa Tenggara", pop: 15711214, share: 5.56 }
];

// Trade in 2024, goods and services, derived from World Bank shares of GDP.
const TRADE_2024 = { exportsUsdBn: 311.5, importsUsdBn: 286.3, source: "World Bank", year: 2024 };
