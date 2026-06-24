#!/usr/bin/env python3
"""
Extract all locale data from Python Faker v40.15.0 and generate TypeScript files.

Usage: python scripts/extract-locales.py

Output: src/dictionary/locales/<locale>/<provider>.ts for each locale/provider combo
"""

import os
import sys
import importlib
from collections import OrderedDict
from typing import Any

# Add project root to path
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "src", "dictionary", "locales")

# Provider types to extract
PROVIDERS = [
    "address", "person", "company", "internet", "lorem", "bank",
    "phone_number", "color", "job", "automotive", "ssn", "passport",
    "profile", "user_agent", "credit_card", "currency", "date_time",
    "misc", "barcode", "file", "geo", "isbn", "sbn", "emoji", "python",
]

# Python attribute name -> TS field name mapping (global, applies to all providers)
ATTR_MAP: dict[str, str] = {
    # Person
    "first_names": "firstNames",
    "first_names_male": "firstNamesMale",
    "first_names_female": "firstNamesFemale",
    "last_names": "lastNames",
    "last_names_male": "lastNamesMale",
    "last_names_female": "lastNamesFemale",
    "prefixes": "prefixes",
    "prefixes_male": "prefixesMale",
    "prefixes_female": "prefixesFemale",
    "suffixes": "suffixes",
    "suffixes_male": "suffixesMale",
    "suffixes_female": "suffixesFemale",
    "language_names": "languageNames",
    "formats_female": "formatsFemale",
    "formats_male": "formatsMale",

    # Address
    "city_prefixes": "cityPrefixes",
    "city_suffixes": "citySuffixes",
    "city_formats": "cityFormats",
    "building_number_formats": "buildingNumberFormats",
    "street_suffixes": "streetSuffixes",
    "street_names": "streetNames",
    "street_name_formats": "streetNameFormats",
    "street_prefixes": "streetPrefixes",
    "street_address_formats": "streetAddressFormats",
    "postcode_formats": "postcodeFormats",
    "postcode_format": "postcodeFormats",
    "address_formats": "addressFormats",
    "country_codes": "countryCodes",
    "country_code": "countryCodes",
    "states": "states",
    "states_abbr": "statesAbbr",
    "regions": "regions",
    "departments": "departments",
    "countries": "countries",
    "secondary_address_formats": "secondaryAddressFormats",
    "city_names": "cityNames",
    "street_titles": "streetTitles",

    # Company
    "company_suffixes": "companySuffixes",
    "company_formats": "companyFormats",
    "bs_adjectives": "buzzAdjectives",
    "bs_nouns": "buzzNouns",
    "bs_verbs": "buzzVerbs",
    "buzzwords": "buzzwords",
    "catch_phrase_adjectives": "catchPhraseAdjectives",
    "catch_phrase_descriptors": "catchPhraseDescriptors",
    "catch_phrase_nouns": "catchPhraseNouns",
    "catch_phrase_words": "catchPhraseWords",

    # Internet
    "domain_words": "domainWords",
    "tlds": "tlds",
    "free_email_domains": "freeEmailDomains",
    "safe_domain_names": "safeDomainNames",
    "hostname_prefixes": "hostnamePrefixes",
    "uri_pages": "uriPages",
    "uri_paths": "uriPaths",
    "uri_extensions": "uriExtensions",
    "http_methods": "httpMethods",
    "http_status_codes": "httpStatusCodes",
    "image_placeholder_services": "imagePlaceholderServices",

    # Lorem
    "words": "words",
    "word_list": "words",

    # Bank
    "swift_codes": "swiftCodes",
    "bank_names": "bankNames",
    "banks": "bankNames",
    "bank_country_codes": "bankCountryCodes",
    "bban_format": "bbanFormat",

    # Phone Number
    "area_codes": "areaCodes",
    "phone_formats": "phoneFormats",
    "country_calling_codes": "countryCallingCodes",
    "msisdn_formats": "msisdnFormats",

    # Color
    "color_names": "colorNames",
    "safe_color_names": "safeColorNames",
    "all_colors": "colorNames",
    "safe_colors": "safeColorNames",

    # Job
    "jobs": "jobTitles",
    "job_titles": "jobTitles",

    # Automotive
    "license_plate_formats": "licensePlateFormats",
    "license_formats": "licensePlateFormats",

    # SSN
    "ssn_formats": "ssnFormats",
    "ssn_format": "ssnFormats",
    "vat_id_formats": "vatIdFormats",

    # Passport
    "passport_formats": "passportFormats",

    # Geo
    "cities": "cities",

    # Currency
    "currencies": "currencies",
    "cryptocurrency_codes": "cryptocurrencyCodes",
    "cryptocurrencies": "cryptocurrencyCodes",
    "currency_symbols": "currencySymbols",
    "price_formats": "priceFormats",

    # Credit Card
    "credit_card_types": "creditCardTypes",

    # Date Time
    "date_formats": "dateFormats",
    "time_formats": "timeFormats",
    "day_names": "dayNames",
    "month_names": "monthNames",
    "century_names": "centuryNames",
    "timezones": "timezones",
    "DAY_NAMES": "DAY_NAMES",
    "MONTH_NAMES": "MONTH_NAMES",
    "AM_PM": "AM_PM",

    # Barcode
    "ean_format": "eanFormat",
    "ean_pattern": "eanPattern",
    "upc_format": "upcFormat",
    "upc_pattern": "upcPattern",

    # Misc
    "boolean_values": "booleanValues",

    # File
    "mime_types": "mimeTypes",
    "file_extensions": "fileExtensions",
    "unix_device_prefixes": "unixDevicePrefixes",

    # Profile
    "profiles": "profiles",

    # User Agent
    "user_agents": "userAgents",

    # ISBN
    "isbn_format": "isbnFormat",

    # SBN
    "sbn_format": "sbnFormat",
}

# Provider-specific overrides for attributes that map differently across providers
# Key: provider_type -> {python_attr_name: ts_field_name}
PROVIDER_ATTR_MAP: dict[str, dict[str, str]] = {
    "person": {
        "formats": "nameFormats",  # Person's formats are name templates
    },
    "company": {
        "formats": "companyFormats",  # Company's formats are company name templates
    },
    "phone_number": {
        "formats": "phoneFormats",  # PhoneNumber's formats are phone number patterns
    },
}

# Attributes to skip (internal, inheritance helpers, etc.)
SKIP_ATTRS = {
    "random_class",
    "__module__",
    "__doc__",
    "__dict__",
    "__weakref__",
    "__init_subclass__",
    "__subclasshook__",
    "__abstractmethods__",
    "_abc_impl",
}


def is_data_value(val: Any) -> bool:
    """Check if a value is a data type we want to extract (not a method/class)."""
    if callable(val):
        return False
    if isinstance(val, (tuple, list, dict, OrderedDict, set, frozenset)):
        return True
    if isinstance(val, (str, int, float, bool, type(None))):
        return True
    return False


def get_locale_attrs(provider_cls: type) -> dict[str, Any]:
    """Get only the data attributes defined on this specific Provider class."""
    # Get attrs from this class only (not inherited)
    own_attrs = {}
    for key, val in provider_cls.__dict__.items():
        if key.startswith("_") or key in SKIP_ATTRS:
            continue
        if not is_data_value(val):
            continue
        own_attrs[key] = val
    return own_attrs


def to_ts_value(val: Any) -> str:
    """Convert a Python value to a TypeScript literal string."""
    if val is None:
        return ""
    if isinstance(val, bool):
        return "true" if val else "false"
    if isinstance(val, (int, float)):
        return str(val)
    if isinstance(val, str):
        escaped = val.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")
        return f"'{escaped}'"
    if isinstance(val, (tuple, list, set, frozenset)):
        items = [to_ts_value(v) for v in val if to_ts_value(v)]
        if not items:
            return ""
        return f"[{', '.join(items)}]"
    if isinstance(val, dict) or isinstance(val, OrderedDict):
        items = []
        has_tuple_keys = any(isinstance(k, (tuple, list)) for k in val.keys())
        if has_tuple_keys:
            # Emit as array of [key..., value] tuples (e.g., ja_JP last_name_pairs)
            for k, v in val.items():
                if v is None:
                    continue
                k_items = [to_ts_value(kv) for kv in k]
                v_str = to_ts_value(v)
                if v_str:
                    k_items.append(v_str)
                    items.append(f"[{', '.join(k_items)}]")
            if not items:
                return ""
            return f"[{', '.join(items)}]"
        else:
            for k, v in val.items():
                k_str = to_ts_value(k)
                v_str = to_ts_value(v)
                if k_str and v_str:
                    items.append(f"{k_str}: {v_str}")
            if not items:
                return ""
            return f"{{{', '.join(items)}}}"
    return ""


def write_ts_file(filepath: str, ts_name: str, data: dict[str, Any]):
    """Write a TypeScript file for a provider's locale data."""
    lines = [
        "import type { LocaleData } from \"../../types\";",
        "",
        f"export const {ts_name}: Partial<LocaleData> = {{",
    ]

    for ts_key, val in sorted(data.items()):
        value = to_ts_value(val)
        if value:
            lines.append(f"  {ts_key}: {value},")

    lines.append("};")
    lines.append("")

    content = "\n".join(lines)

    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Wrote {filepath}")


def extract_provider_data(provider_type: str) -> dict[str, dict[str, Any]]:
    """
    Extract all locale data for a given provider type.
    Returns dict of locale_code -> {ts_field_name: python_value}
    """
    import faker.providers
    mod = getattr(faker.providers, provider_type)
    pkg_dir = os.path.dirname(mod.__file__)

    # Get provider-specific attr overrides (e.g., "formats" maps differently per provider)
    provider_overrides = PROVIDER_ATTR_MAP.get(provider_type, {})

    result: dict[str, dict[str, Any]] = {}

    locale_dirs = sorted([
        d for d in os.listdir(pkg_dir)
        if os.path.isdir(os.path.join(pkg_dir, d))
        and not d.startswith("_")
        and d != "__pycache__"
    ])

    for locale_code in locale_dirs:
        try:
            # Import the locale's module
            locale_mod = importlib.import_module(
                f"faker.providers.{provider_type}.{locale_code}"
            )
            if not hasattr(locale_mod, 'Provider'):
                continue

            provider_cls = locale_mod.Provider
            attrs = get_locale_attrs(provider_cls)

            if not attrs:
                continue

            # Map Python attr names to TS names (global + provider-specific)
            mapped = {}
            for py_key, val in attrs.items():
                # Check provider-specific map first, then global map, then pass through
                ts_key = provider_overrides.get(py_key, ATTR_MAP.get(py_key, py_key))
                mapped[ts_key] = val

            result[locale_code] = mapped

        except Exception as e:
            print(f"  [WARN] Could not extract {provider_type}/{locale_code}: {e}",
                  file=sys.stderr)

    return result


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    all_locale_providers: dict[str, dict[str, dict[str, Any]]] = {}
    # locale_code -> {provider_type -> {ts_field: value}}

    for provider_type in PROVIDERS:
        print(f"\nExtracting {provider_type}...")
        data = extract_provider_data(provider_type)
        for locale_code, attrs in data.items():
            if locale_code not in all_locale_providers:
                all_locale_providers[locale_code] = {}
            all_locale_providers[locale_code][provider_type] = attrs

    # Write provider files for each locale
    total_files = 0
    for locale_code in sorted(all_locale_providers.keys()):
        if locale_code == "en_US":
            continue
        locale_dir = os.path.join(OUTPUT_DIR, locale_code)
        providers = all_locale_providers[locale_code]

        for provider_type, attrs in providers.items():
            ts_name = provider_type.replace("-", "_")
            filename = f"{provider_type}.ts"
            filepath = os.path.join(locale_dir, filename)

            write_ts_file(filepath, ts_name, attrs)
            total_files += 1

    # Write index.ts for each locale
    for locale_code in sorted(all_locale_providers.keys()):
        if locale_code == "en_US":
            continue
        locale_dir = os.path.join(OUTPUT_DIR, locale_code)
        providers = all_locale_providers[locale_code]

        imports = []
        spreads = []
        # Sort to match our pattern: each provider sub-file spreads in
        provider_types_sorted = sorted(providers.keys())
        for provider_type in provider_types_sorted:
            ts_name = provider_type.replace("-", "_")
            filename = provider_type
            imports.append(
                f"import {{ {ts_name} }} from \"./{filename}\";"
            )
            spreads.append(ts_name)

        # Each locale inherits from en_US
        lines = [
            f"import {{ en_US }} from \"../en_US\";",
            f"import type {{ LocaleData }} from \"../../types\";",
        ]
        lines.extend(imports)
        lines.append("")
        lines.append(f"export const {locale_code}: LocaleData = {{")
        lines.append("  ...en_US,")
        for s in spreads:
            lines.append(f"  ...{s},")
        lines.append("};")
        lines.append("")

        filepath = os.path.join(locale_dir, "index.ts")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        print(f"  Wrote {filepath}")
        total_files += 1

    print(f"\n{'='*60}")
    print(f"Generated {total_files} files for {len(all_locale_providers)} locales")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
