# Load library to read in csv files and plot data
install.packages("readr")
install.packages("ggplot2")
library(readr)
library(ggplot2)

# Read in the csv file using readr, specifying the column types
df <- read_csv("c:\\Users\\e.a.wright\\data-art\\AB_NYC_2019.csv", 
               col_types = cols(id = col_double(), 
                                name = col_character(), 
                                host_id = col_double(), 
                                host_name = col_character(), 
                                neighbourhood_group = col_character(), 
                                neighbourhood = col_character(), 
                                latitude = col_double(), 
                                longitude = col_double(), 
                                room_type = col_character(), 
                                price = col_double(), 
                                minimum_nights = col_double(), 
                                number_of_reviews = col_double(), 
                                last_review = col_character(), 
                                reviews_per_month = col_double(), 
                                calculated_host_listings_count = col_double(), 
                                availability_365 = col_double()))


ggplot(data = df, mapping = aes(df$price)) +
  geom_histogram() +
  labs(x = "Price", y = "Frequency")

ggplot(data = df, mapping = aes(df$price)) +
  geom_density()

ggplot(data = df, mapping = aes(df$price)) +
  geom_freqpoly()

# Violin plot might be the best option
ggplot(data = df, mapping = aes(df$neighbourhood_group,df$price)) +
geom_violin() +
labs(x = "Neighbourhood", y = "Price")

ggplot(data = df, aes(x = neighbourhood_group, y = price)) +
  geom_violin(width = 0.8) +
  geom_hline(yintercept = median(df$price), color = "red", linetype = "dashed") +
  labs(x = "Neighbourhood", y = "Price")

# Favorite so far:
ggplot(data = df, aes(x = neighbourhood_group, y = price, fill = room_type)) +
  geom_violin(width = 0.8) +
  labs(x = "Neighbourhood", y = "Price")

ggplot(data = df, aes(x = neighbourhood_group, y = price)) +
  geom_violin(width = 0.8) +
  stat_summary(fun = median, geom = "point", shape = 18, size = 3, color = "red") +
  labs(x = "Neighbourhood", y = "Price")

# Adjusting Y-Axis Scale to be nonlinear

### Favorite:
# Option 1: Logarithmic Scale
ggplot(data = df, aes(x = neighbourhood_group, y = price, fill = room_type)) +
  geom_violin(width = 0.8) +
  labs(x = "Neighbourhood", y = "Price") +
  scale_y_log10()

# Option 2: Square Root Scale
ggplot(data = df, aes(x = neighbourhood_group, y = price, fill = room_type)) +
  geom_violin(width = 0.8) +
  labs(x = "Neighbourhood", y = "Price") +
  scale_y_sqrt()

# Option 3: Custom Transformation (log2 scale)
ggplot(data = df, aes(x = neighbourhood_group, y = price, fill = room_type)) +
  geom_violin(width = 0.8) +
  labs(x = "Neighbourhood", y = "Price") +
  scale_y_continuous(trans = 'log2')


library(dplyr)

# Sort in ascending order by median price
df_sorted <- df %>%
  group_by(neighbourhood_group) %>%
  summarise(median_price = median(price)) %>%
  arrange(median_price)

df$neighbourhood_group <- factor(df$neighbourhood_group, levels = df_sorted$neighbourhood_group)

ggplot(data = df, aes(x = neighbourhood_group, y = price, fill = room_type)) +
  geom_violin(width = 0.8) +
  labs(x = "Neighbourhood Group", y = "Price (Log Scale)") +
  ggtitle("Violin Plot of 2019 NYC Airbnb Listing Prices by Neighbourhood Group and Room Type") +
  theme(plot.title = element_text(hjust = 0.5)) +
  scale_y_log10()
  
