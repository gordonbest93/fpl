import streamlit as st
import pandas as pd
from fpl_team_selector import select_team  # You may need to edit this if your function is named differently

st.set_page_config(page_title="FPL Team Selector", layout="wide")

st.title("Fantasy Premier League Team Selector")

st.markdown("Adjust your budget and select your optimal FPL team.")

# Example slider for budget input
budget = st.slider("Choose your budget (£ million)", min_value=50, max_value=100, value=80)

# Call your team selection function
try:
    team = select_team(budget)
    st.write("### Your Selected Team:")
    st.dataframe(team)
except Exception as e:
    st.error(f"Error generating team: {e}")
