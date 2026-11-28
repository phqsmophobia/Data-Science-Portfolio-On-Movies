# Data-Science-Portfolio-On-Movies

## The Plan 
To explore a range of data science and machine learning models by training and testing them on a self-curated dataset built using data retrieved from the TMDB and IMDb APIs. The objective is to compare the performance of different models and determine which is most effective at answering the research question.

## The Research Question
Can Data Science & Machine Learning models be used to determine the revenue of a movie based on its production budget?

## Data Sourcing & Collection 
Rather than downloading a pre-made data set from a source like Kaggle, the idea is to build my own master dataset of movies from multiple sources using a combination of API's (TMDB API, IMDb). In doing so, I can have more control over the dataset itself while also getting a better understanding of the full process of data analytics. 

Varying data regarding each movie can be found in multiple sources. For instance, the movie genre, release date, revenue and budget may all be found in the TMDB API, whilst ratings can be found via IMDb-related data.

# Movie.Metrics — Project Summary & What I Learned

**Movie.Metrics** is an interactive data science portfolio web app that compares how three machine learning models—**Linear Regression**, **Decision Tree**, and **Random Forest** predict box office revenue across 902 films (trained on an 80/20 split using TMDB and IMDb data).

## 1. Data Science & Machine Learning Takeaways

- **Feature Engineering Makes a Measurable Difference:** Comparing `v1` (Budget only) against `v2` (Budget + IMDb rating) showed how adding a second meaningful signal improves overall predictive power. Across all three models, adding IMDb scores boosted $R^2$ and lowered both **RMSE** and **MAE**.
- **Handle Noise Better:** Random Forest consistently outperformed a single Decision Tree and Linear Regression in overall error metrics and resisted extreme over-predictions on outlier films by averaging across multiple trees.
- **Prediction Accuracy Perfection:** A model with a better overall $R^2$ and lower average error can still miss worse on an individual movie. High-rated films with modest box office runs can cause the Budget + IMDb models to overestimate compared to Budget-only, highlighting why real-world box office forecasting is noisy without features like marketing spend, cast, franchise status, or release timing.

## 2. Useful Reference Webpages & Documentation

1. [scikit-learn — `train_test_split`](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html) — Splitting the 902-film dataset into 80% training and 20% testing sets.
2. [scikit-learn — `LinearRegression`](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html) — Implementing the baseline linear regression models (`v1` and `v2`).
3. [scikit-learn — `DecisionTreeRegressor`](https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeRegressor.html) — Training single regression trees to capture non-linear budget and rating thresholds.
4. [scikit-learn — `RandomForestRegressor`](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html) — Building the ensemble model to reduce variance and handle box-office outliers.
5. [scikit-learn — Regression Metrics ($R^2$, RMSE, MAE)](https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics) — Evaluating model accuracy and average dollar error across the test split.
6. [MDN Web Docs — CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) — Structuring the responsive 2×3 comparison grid for the six model cards.
7. [MDN Web Docs — CSS `z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) — Layering the autocomplete search dropdown cleanly over the results grid.

## Data Sources & Attribution

- Movie information: TMDB API.
- Movie ratings and vote counts: IMDb API.

Data courtesy of TMDB and IMDb.
