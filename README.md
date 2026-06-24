# Faker

A TypeScript port of [Python Faker](https://github.com/joke2k/faker) — zero-dependency fake data generator for testing, development, and database seeding.

> **Disclaimer:** This is an independent TypeScript reimplementation, not affiliated with the Python Faker project.

## Features

- **26 data provider categories** — names, addresses, phones, emails, companies, lorem ipsum, colors, bank details, credit cards, barcodes, currencies, automotive, geo, jobs, ISBNs, SBNs, SSNs, passports, profiles, DOIs, emoji, user agents, date/time, file paths, misc (UUID, passwords, etc.), and Python-like types.
- **104+ locales** with locale-specific data (names, addresses, phone formats, etc.)
- **Deterministic seeding** for reproducible output
- **Zero runtime dependencies**
- **Full TypeScript** with strict types

## Installation

```bash
npm install faker
```

## Usage

### Quick Start

```typescript
import { faker } from "faker";

faker.name();              // "John Smith"
faker.first_name();        // "John"
faker.last_name();         // "Smith"
faker.email();             // "john.smith@example.com"
faker.city();              // "New York"
faker.street_address();    // "123 Main St"
faker.phone_number();      // "(555) 123-4567"
faker.uuid4();             // "a1b2c3d4-..."
faker.company();           // "Acme Inc."
faker.catch_phrase();      // "De-engineered holistic orchestration"
faker.paragraph();         // "Lorem ipsum dolor sit amet..."
faker.license_plate();     // "ABC-1234"
faker.creditCardNumber();  // "4111111111111111"
```

### Deterministic Seeding

```typescript
import { Faker } from "faker";

Faker.seed(42);
const f1 = new Faker();
const name1 = f1.name();

Faker.seed(42);
const f2 = new Faker();
console.log(f2.name() === name1); // true
```

### Locale Support

```typescript
// Async factory for any locale
const frFaker = await Faker.create("fr_FR");
frFaker.first_name();  // French first name
frFaker.locale;        // "fr_FR"

// Create then switch locale
const faker = new Faker();
await faker.initialize("de_DE");
faker.phone_number();  // German phone format (+49...)
```

Supported locales include `en_US`, `de_DE`, `fr_FR`, `ja_JP`, `zh_CN`, `ko_KR`, `ru_RU`, `ar_DZ`, `es_ES`, `it_IT`, `pt_BR`, `nl_NL`, `sv_SE`, `da_DK`, `fi_FI`, `nb_NO`, `pl_PL`, `cs_CZ`, `sk_SK`, `hu_HU`, `ro_RO`, `bg_BG`, `el_GR`, `tr_TR`, `he_IL`, `hi_IN`, `th_TH`, `vi_VN`, `id_ID`, `ms_MY`, `fil_PH`, and many more (104+ total).

Short codes like `"fr"` are auto-expanded to `"fr_FR"`.

### Creating a New Instance

```typescript
const faker = new Faker();
faker.name();
```

## API Overview

### Person
`name()`, `first_name()`, `last_name()`, `name_male()`, `name_female()`, `prefix()`, `suffix()`, `language_name()`

### Address
`city()`, `street_name()`, `street_address()`, `postcode()`, `zipcode()`, `state()`, `state_abbr()`, `country()`, `country_code()`, `building_number()`, `secondary_address()`

### Internet
`email()`, `safe_email()`, `free_email()`, `company_email()`, `domain_name()`, `tld()`, `url()`, `uri()`, `slug()`, `ipv4()`, `ipv6()`, `mac_address()`, `port_number()`, `http_method()`, `http_status_code()`, `hostname()`, `user_name()`, `username()`, `image_url()`, `dga()`, `iana_id()`, `ripe_id()`, `nic_handle()`

### Phone Number
`phone_number()`, `country_calling_code()`, `msisdn()`

### Company
`company()`, `company_suffix()`, `catch_phrase()`, `bs()`

### Lorem
`word()`, `words()`, `sentence()`, `sentences()`, `paragraph()`, `paragraphs()`, `text()`, `texts()`

### Bank
`bank()`, `bank_country()`, `aba()`, `bban()`, `iban()`, `swift()`, `swift8()`, `swift11()`

### Credit Card
`creditCardNumber()`, `creditCardProvider()`, `creditCardExpire()`, `creditCardFull()`, `creditCardSecurityCode()`

### Color
`color_name()`, `safe_color_name()`, `hex_color()`, `safe_hex_color()`, `rgb_color()`, `rgb_css_color()`, `color_rgb()`, `color_rgb_float()`, `color_hsl()`, `color_hsv()`

### Date Time
`date()`, `time()`, `date_time()`, `unix_time()`, `iso8601()`, `date_between()`, `future_date()`, `past_date()`, `date_of_birth()`, `date_this_century()`, `date_this_decade()`, `date_this_year()`, `date_this_month()`, `timezone()`, `am_pm()`, `day_of_week()`, `month_name()`, `century()`

### Barcode
`ean()`, `ean8()`, `ean13()`, `localized_ean()`, `localized_ean8()`, `localized_ean13()`

### Currency
`currency()`, `currency_code()`, `currency_name()`, `currency_symbol()`, `cryptocurrency()`, `cryptocurrency_code()`, `cryptocurrency_name()`, `pricetag()`

### Automotive
`license_plate()`, `vin()`

### Geo
`coordinate()`, `latitude()`, `longitude()`, `latlng()`, `local_latlng()`, `location_on_land()`

### Job
`job()`, `job_female()`, `job_male()`

### File
`mime_type()`, `file_extension()`, `file_name()`, `file_path()`, `unix_device()`, `unix_partition()`

### Misc
`boolean()`, `null_boolean()`, `binary()`, `md5()`, `sha1()`, `sha256()`, `uuid4()`, `password()`, `zip()`, `tar()`, `image()`, `csv()`, `tsv()`, `psv()`, `json()`, `json_bytes()`, `xml()`, `fixed_width()`, `dsv()`, `enum()`

### ISBN / SBN
`isbn13()`, `isbn10()`, `sbn9()`

### SSN
`ssn()`

### Passport
`passport_number()`, `passport_owner()`, `passport_dob()`

### Profile
`simple_profile()`, `profile()`

### DOI
`doi()`

### Emoji
`emoji()`

### User Agent
`user_agent()`, `chrome()`, `firefox()`, `safari()`, `opera()`, `internet_explorer()`

### Python-like Types
`pybool()`, `pystr()`, `pystr_format()`, `pyfloat()`, `pyint()`, `pydecimal()`, `pytuple()`, `pyset()`, `pylist()`, `pyiterable()`, `pydict()`, `pystruct()`

## Architecture

```
src/
├── index.ts            # Faker class, default proxy export
├── generator.ts        # Generator (PRNG + method dispatch) + BaseProvider
├── typing.ts           # Type definitions (SeedType, FakerConfig)
├── dictionary/         # Locale data system
│   ├── index.ts        # Async locale loader with caching
│   ├── types.ts        # LocaleData interface
│   ├── base/           # Default (en_US) locale data
│   └── locales/        # 104+ locale directories
└── provider/           # 26 data provider modules
    ├── person/
    ├── address/
    ├── internet/
    └── ...
```

- **Generator**: Core PRNG (mulberry32) + method dispatching. Methods are bound to the generator so `{{method}}` token parsing works in strings.
- **BaseProvider**: Base class with helpers like `randomElement()`, `numerify()`, `lexify()`, `bothify()`, `hexify()`.
- **Providers**: Each extends `BaseProvider` with locale-aware methods.
- **Locale System**: Async `getLocale()` loads locale-specific data with caching. `en_US` is always available synchronously.
- **Proxy**: The default `faker` export is a `Proxy` on a pre-initialized `Faker` instance, enabling `faker.name()` style access.

## Build

```bash
npm run build    # tsc → compiles src/ to dist/
```

## Test

```bash
npm test         # vitest run
```

Tests cover all providers, locale switching, seeding, and e2e integration.

## Locale Data

Locale data is stored as TypeScript modules under `src/dictionary/locales/<locale>/`. Each locale directory contains provider-specific files (e.g., `address.ts`, `person.ts`) with arrays of localized strings. Data can be regenerated from Python Faker using the included extraction script:

```bash
tsx scripts/extract-locales.py
```

## License

MIT
