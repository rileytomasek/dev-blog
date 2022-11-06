---
title: Command line JSON with jq
publish_date: 2022-11-06
description: One liners for wrangling JSON
og:image: https://assets.rile.yt/api/post?date=2022-11-06&title=Command%20line%20JSON%20with%20jq
---

> [jq](https://stedolan.github.io/jq/) is like sed for JSON data - you can use it to slice and filter and map and transform structured data with the same ease that sed, awk, grep and friends let you play with text.

I regret not learning how to use jq earlier. If you frequently deal with JSON, it will save you a lot of time.

This post is both a practical introduction for you, and a reminder for future me. The jq syntax can be terse.

### Loading Data

- From a file: `jq '.' data.json`
- From a string: `echo '{"person": { "name": "Riley" }}' | jq '.'`
- From curl: `https://api.github.com/repos/rileytomasek/zodix/commits`

### Pretty Printing JSON

The `jq '.'` syntax will pretty print the JSON.

```bash
echo '{"person": { "name": "Riley" }}' | jq '.'
❯ {
❯   "person": {
❯     "name": "Riley"
❯   }
❯ } 
```

Which is great for saving API requests to a file:
```bash
echo '{"person": { "name": "Riley" }}' | jq '.' > data.json
```

### Accessing Properties

Getting property values is straightforward:
```bash
echo '{"person": { "name": "Riley" }}' | jq '.person'
❯ {
❯   "name": "Riley"
❯ }

echo '{"person": { "name": "Riley" }}' | jq '.person.name'
❯ "Riley"
```

### Arrays

This is the part I struggled with the most, and likely the most important for real world use cases.

```bash
echo '[1,2,3]' | jq '.[]'
❯ 1
❯ 2
❯ 3

echo '{"people": ["Bill", "Bob"]}' | jq '.people[]'
❯ "Bill"
❯ "Bob"
```

I like to think of the `.[]` notation as turning the array into a list. Once you have a list, you can do things like select values, filter, and map.

Assume we're working with this JSON:

```json
{
  "locations": [
    { "city": "New York", "state": "New York", "country": "USA" },
    { "city": "Miami", "state": "Florida", "country": "USA" },
    { "city": "Vancouver", "state": "BC", "country": "Canada" }
  ]  
}
```

Select the name of each city:

```bash
jq '.locations[].city' data.json
❯ "New York"
❯ "Miami"
❯ "Vancouver"
```

Select the name of each city in USA:

```bash
jq '.locations[] | select(.country=="USA").city' data.json
❯ "New York"
❯ "Miami"
```

Select a city by index:

```bash
jq '.locations[0]' data.json
❯ {
❯   "city": "New York",
❯   "state": "New York",
❯   "country": "USA"
❯ }
```

Select a slice of cities:

```bash
jq '.locations[0:2]' data.json
❯ [
❯   {
❯     "city": "New York",
❯     "state": "New York",
❯     "country": "USA"
❯   },
❯   {
❯     "city": "Miami",
❯     "state": "Florida",
❯     "country": "USA"
❯   }
❯ ]
```

It's important to note that the slice above returned an array, not a list, so you can't do this:

```bash
jq '.locations[0:2].city' data.json
❯ jq: error (at data.json:7): Cannot index array with string "city"
```

But it's easy to fix. Just use `.[]` to turn the array into a list:
```bash
jq '.locations[0:2] | .[].city' data.json
❯ "New York"
❯ "Miami"
```

To convert the list back to valid JSON, just wrap `.[].city` in an array like `[.[].city]`.

```bash
jq '.locations[0:2] | [.[].city]' data.json
❯ [
❯   "New York",
❯   "Miami"
❯ ]
```

At this point, you could save the data you selected as a valid JSON file.

```bash
jq '.locations[0:2] | [.[].city]' data.json > cities.json
```

### Finding Unique Values

To get a list of the unique countries:

- Get a list of the country names `.locations[].country`
- Turn the list into an array `[.locations[].country]`
- Call `| unique` on the array

```bash
jq '[.locations[].country] | unique' data.json
❯ [
❯  "Canada",
❯   "USA"
❯ ]
```

You could take it one step further and get the number of unique countries like this:

```bash
jq '[.locations[].country] | unique | length' data.json
❯ 2
```

### Transforming Values

This is the real magic of jq for me. Let's take the location JSON and apply a few realistic transformations.

```json
{
  "locations": [
    { "city": "New York", "state": "New York", "country": "USA" },
    { "city": "Miami", "state": "Florida", "country": "USA" },
    { "city": "Vancouver", "state": "BC", "country": "Canada" }
  ]  
}
```

Use string concatenation to add a full name for each city:

```bash
jq '[.locations[]] | map(. + {
  name: (.city + ", " + .state + ", " + .country)
})' data.json
❯ [
❯   {
❯     "name": "New York, New York, USA",
❯     "country": "USA",
❯     "city": "New York",
❯     "state": "New York"
❯   },
❯   {
❯     "name": "Miami, Florida, USA",
❯     "country": "USA",
❯     "city": "Miami",
❯     "state": "Florida"
❯   },
❯   {
❯     "name": "Vancouver, BC, Canada",
❯     "country": "Canada",
❯     "city": "Vancouver",
❯     "state": "BC"
❯   }
❯ ]
```

### Basic Analysis

Using jq can be the quickest way to run basic analysis on JSON:

```bash
jq '[.locations[]] | {
  count: . | length,
  numCountries: [.[].country] | unique | length,
  countries: [.[].country] | unique,
}' data.json
❯ {
❯   "count": 3,
❯   "numCountries": 2,
❯   "countries": [
❯     "Canada",
❯     "USA"
❯   ]
❯ }
```

### Conclusion

While somewhat confusing to learn and remember, [jq](https://stedolan.github.io/jq/) is a powerful tool for quick JSON analysis and transformations from the command line.
