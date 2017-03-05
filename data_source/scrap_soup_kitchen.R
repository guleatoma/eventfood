library(rvest)
library(dplyr)
library(stringr)

url <-"http://www.homelessshelterdirectory.org/cgi-bin/id/cityfoodbanks.cgi?city=San%20Francisco&state=CA"

html <- read_html(url)

names = html %>%
  html_nodes(xpath = "//h4") %>%
  html_text()

# Sadly we can't get the full address but we can get the zipcode
desc = html %>%
  html_nodes(xpath = "//*[contains(concat( ' ', @class, ' ' ), concat( ' ', 'item_content', ' ' ))]") %>%
  html_text()

desc=desc[-1]

zip_code = str_extract(desc, "([0-9]+[0-9]+[0-9]+[0-9]+[0-9])")

data = data.frame(
	name = names,
	zip_code = zip_code
	)

write.csv(data, 'soup_kitchen_SF.csv')
