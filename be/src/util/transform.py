def transform_if_exists(value, func):
    if value is not None:
        return func(value)
    return None