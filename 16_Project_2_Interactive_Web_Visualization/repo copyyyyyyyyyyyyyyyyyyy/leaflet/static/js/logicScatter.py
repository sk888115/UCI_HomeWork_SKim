import os
import pandas as pd
import mimetypes
import plotly.express as px

# deal with mimetype error
print(mimetypes.guess_extension("application/octet-stream"))

# Read in csv
cali_by_counties = pd.read_csv("../../output/cali_county.csv")


fig = px.scatter(cali_by_counties, x="county", y="cases", color="county",
                 size='cases', hover_data=['county'])
fig.show()