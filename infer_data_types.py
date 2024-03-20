# %%

import pandas as pd
import json
import sys

def infer_and_convert_data_types(file):
    df = pd.read_csv(file)
    columns = df.columns
    for col in columns:
        # Attempt to convert to numeric first
        df_converted = pd.to_numeric(df[col], errors='coerce')
        if not df_converted.isna().all():  # If at least one value is numeric
            df[col] = df_converted
            continue

        # Attempt to convert to datetime
        try:
            df[col] = pd.to_datetime(df[col])
            continue
        except (ValueError, TypeError):
            pass

        # Check if the column should be categorical
        if len(df[col].unique()) / len(df[col]) < 0.5:  # Example threshold for categorization
            df[col] = pd.Categorical(df[col])
    
    df = df.convert_dtypes()
    
    dtypes_dict = {col: str(df[col].dtype) for col in columns}
    processed_data = json.dumps(dtypes_dict)
    #print('processed data: ',df)
    #json_data = json.dumps(processed_data)
    return processed_data



if __name__ == "__main__":
  filename = sys.argv[1]
  #print(filename)
  processed_data = infer_and_convert_data_types(filename)
  print(processed_data)
# Test the function with your DataFrame


# %%
