# process-peru-schools

We are using this repo to process the files for: https://wiki.openstreetmap.org/wiki/Import/Catalogue/Peru/schools


## Install

```
git clone https://github.com/Rub21/process-peru-schools.git
cd process-peru-schools/
npm link
```

## Usage

### format

```
peruschools -f file.geojson > output.geojson

```

### split

The split should be for Peru, 

```
peruschools -f file.geojson tmp --zoom=15

```