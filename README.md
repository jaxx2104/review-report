# warsman

Displays the most contributing silent hero in the code review.

![warsman](https://blogs.c.yimg.jp/res/blog-8d-e6/saranndonn/folder/1835128/84/66599984/img_0)

_warsman is the silent hero._

## Install

```
$ npm install -g warsman
```

## Usage

### Table mode

```
$ warsman --repo facebook/react --token XXXXXXXXXX
```

result

```
┌─────────┬────────────┬───────┐
│ (index) │    user    │ count │
├─────────┼────────────┼───────┤
│    0    │ 'jaxx2104' │  26   │
│    1    │ 'foo'      │  23   │
│    2    │ 'bar'      │  19   │
└─────────┴────────────┴───────┘
```

### Figlet mode

```
$ warsman --repo facebook/react --token XXXXXXXXXX --figlet Slant
```

result

```
       _                ___  _______  __ __
      (_)___ __  ___  _|__ \<  / __ \/ // /
     / / __ `/ |/_/ |/_/_/ // / / / / // /_
    / / /_/ />  <_>  </ __// / /_/ /__  __/
 __/ /\__,_/_/|_/_/|_/____/_/\____/  /_/
/___/
```

## Options

| option                    | description                                         |
| ------------------------- | --------------------------------------------------- |
| -V, --version             | output the version number                           |
| --u, --url <url>          | GitHub API URL (default: "https://api.github.com/") |
| -r, --repo <account/repo> | GitHub Repository                                   |
| -t, --token <token>       | GitHub Personal Access Token                        |
| --max <n>                 | GitHub Max PullRequests                             |
| --figlet <font>           | figlet mode                                         |
