## Goal
- Migrate faker-python (v40.15.0) to TypeScript as a monorepo with a separate `faker-dictionary` data package and a `faker` runtime package, with tests alongside source code.

## Constraints & Preferences
- Dictionary package must export categorized word arrays (e.g., `firstNames`, `streetSuffixes`) usable independently by other projects
- Each provider imports locale data from the dictionary package
- Tests live alongside source in `__tests__/` folders (not a separate test package)
- Single-package npm workspace (no workspace protocol due to npm 11.6.3 limitation)
- Test runner: vitest
- Strict TypeScript, ES2022 target, ESM modules

## Progress

### Done
- **Migration report** created at `/Learning2026/Fake-data-generator/Migration-report.md` (~5% of Python features migrated initially)
- **Monorepo scaffolding**: root `package.json`, `tsconfig.base.json`, single-package `package.json` with vitest
- **faker-dictionary package**: 
  - `src/dictionary/types.ts` — `LocaleData` interface, `LocaleMap`, `getLocale()` helper
  - `src/dictionary/locales/en.ts` — English locale data: firstNames (200+), lastNames (200+), words (5000+), citySuffixes, streetSuffixes, buildingNumberFormats, postcodeFormats, domainWords, tlds, freeEmailDomains, companySuffixes, buzzAdjectives/Nouns/Verbs, catchPhrase data, swiftCodes, bankNames, phoneFormats, areaCodes, licensePlateFormats, ssnFormats, passportFormats, colorNames, safeColorNames, booleanValues, httpMethods, httpStatusCodes, uriPages/Paths/Extensions, imagePlaceholderServices, languageNames (140+)
  - `src/dictionary/index.ts` — barrel exports
  - `__tests__/dictionary.test.ts` — 20+ tests for data integrity
- **Core engine** (`src/generator.ts`):
  - Fixed duplicate `const fn` bug in `parse()`, fixed `fn.call(this)` binding, removed dead code
  - Added `BaseProvider` with all Python-equivalent utilities: `randomInt`, `randomDigit`, `randomDigitNotNull`, `randomDigitAboveTwo`, `randomDigitOrEmpty`, `randomDigitNotNullOrEmpty`, `randomNumber`, `randomLetter`, `randomLetters`, `randomLowercaseLetter`, `randomUppercaseLetter`, `randomChoices`, `randomSample`, `randomizeNbElements`, `numerify`, `lexify`, `bothify`, `hexify`, `locale`, `languageCode`
  - Added weighted `randomElement` support for `Record<string, number>`
  - Fixed `seedInstance` to propagate seed to all providers
  - Static `Generator.seed()` now persists `_globalSeed` for new instance creation
- **All 23 providers implemented** (each imports from dictionary):
  - `PersonProvider` — name, first_name, last_name, name_male, name_female, prefix/suffix (male/female/nonbinary), language_name
  - `InternetProvider` — email (safe/free/company), domain_name, url, username, safe_domain_name, ipv4/ipv6, mac_address, port_number, http_method, uri_page/path/extension, slug, image_url, iana_id, ripe_id, nic_handle, dga
  - `AddressProvider` — city, state, zipcode, street_address, postcode, country, country_code, building_number, city_suffix, street_suffix, street_name
  - `CompanyProvider` — company, company_suffix, catch_phrase, bs, buzzword
  - `LoremProvider` — word, words, sentence, sentences, paragraph, paragraphs, text, texts
  - `BankProvider` — bank, bank_country, aba, bban, iban, swift/swift8/swift11
  - `PhoneNumberProvider` — phone_number, country_calling_code, msisdn
  - `ColorProvider` — color_name, safe_color_name, hex_color, safe_hex_color, rgb_color, rgb_css_color, color_rgb, color_rgb_float, color_hsl, color_hsv
  - `MiscProvider` — boolean, null_boolean, md5, sha1, sha256, uuid4, password, zip, csv, tsv, psv, json, xml, fixed_width, tar, image, enum, binary
  - `CreditCardProvider` — credit_card_number, credit_card_provider, credit_card_expire, credit_card_full, credit_card_security_code, Luhn checksum
  - `BarcodeProvider` — ean, ean8, ean13, localized variants, EAN check digit calculation
  - `CurrencyProvider` — currency, currency_code, currency_name, cryptocurrency, cryptocurrency_code, cryptocurrency_name, pricetag
  - `AutomotiveProvider` — license_plate, vin, char weight helper
  - `FileProvider` — mime_type, file_extension, file_name, file_path, unix_device, unix_partition
  - `GeoProvider` — coordinate, latitude, longitude, latlng, local_latlng, location_on_land
  - `JobProvider` — job, job_female, job_male
  - `IsbnProvider` — isbn10, isbn13 with check digit
  - `SbnProvider` — sbn9
  - `SsnProvider` — ssn with age range
  - `PassportProvider` — passport_number, passport_owner, passport_dob
  - `ProfileProvider` — simple_profile, profile
  - `PythonProvider` — pybool, pystr, pystr_format, pyfloat, pyint, pydecimal, pytuple, pyset, pylist, pyiterable, pydict, pystruct, enum
  - `DoiProvider` — doi
  - `EmojiProvider` — emoji
  - `UserAgentProvider` — chrome, firefox, safari, opera, internet_explorer, user_agent, platform tokens
- **`src/index.ts`** — Faker class with all 23 providers wired in, proxy-based property delegation, seed/static seed
- **100% of planned test files created** (27 test files total):
  - `__tests__/base-provider.test.ts` (38 tests — ALL PASSING)
  - `__tests__/dictionary.test.ts` (10 tests)
  - `__tests__/e2e.test.ts` (3 tests)
  - All 23 provider test files with 6-10 tests each

### In Progress
- **Fixing import paths**: Provider test files have incorrect relative paths (`../../../src/index` vs `../../index`). PowerShell string replacement failed due to shell escaping issues. Need to fix via script or manual batch.
- **Fixing vitest config**: Need proper `vitest.config.ts` with correct `include` patterns and TypeScript path resolution.
- **Running full test suite**: Target is `npm run test` passing all ~150+ tests.

### Blocked
- Nothing permanently blocked. The remaining issues are:
  1. Import path fix (mechanical, known fix)
  2. Vitest TypeScript path resolution configuration
  3. Potential type compatibility issues between `import { Generator }` in provider constructors and `import type { LocaleData }` — the provider constructors currently accept `import("../../generator").Generator` which may need to be the actual class reference

## Key Decisions
- **Single package** instead of npm workspaces (npm 11.6.3 doesn't support `workspace:*` protocol)
- **Dictionary package is part of same TypeScript project** (under `src/dictionary/`) — re-exported for external consumers via package `exports` field
- **Providers accept pre-loaded locale data** rather than loading it themselves — makes dependency injection explicit
- **All 23 providers wired into Faker constructor** from day 1 — no lazy/dynamic registration needed

## Next Steps
1. Fix all provider test import paths: change `../../../src/index` to `../../index` (25 files)
2. Add `vitest.config.ts` with proper TypeScript support or update `tsconfig.json` include paths
3. Run `npx vitest run` and fix any remaining compilation issues
4. Iterate on failing tests until all pass
5. Run `npm run build` to verify TypeScript compilation
6. Add remaining locale files (fr, de, ja, es, zh, ko) as Phase 2

## Critical Context
- **en.ts syntax bug FIXED**: trailing `," on line 25 caused unterminated string literal
- **generator.ts parse() bug FIXED**: removed duplicate `const fn` declaration, fixed `fn.call(this)` binding
- **generator.ts static seed propagation**: `Generator.seed()` now stored in `_globalSeed`, constructor checks and applies it
- **randomInt() fix**: proper `Math.floor(this._randomFn() * range)` implementation instead of broken bitwise OR approach
- **Provider constructor pattern**: each provider takes `(generator, data)` where `data` is `LocaleData` from dictionary — this is the key architectural pattern for dictionary separation
- **Import type issue**: providers import `Generator` class (runtime), but `LocaleData` via `import type` (type-only) — this is correct and preserves tree-shaking
- **Root tests** (`__tests__/`) use `../src/index` imports; **provider tests** (`src/providers/X/__tests__/`) need `../../index` imports (3 levels up from `__tests__/`)