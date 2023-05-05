const dataMethod = ["body", "headers", "query", "params"];
export const valdaition = (schema) => {
  return (req, res, next) => {
    try {
      const valdaitionarr = [];
      dataMethod.forEach((key) => {
        if (schema[key]) {
          const validationResult = schema[key].validate(req[key], {
            abortEarly: false,
          });
          if (validationResult.error) {
            valdaitionarr.push(validationResult.error.details);
          } else {
            next();
          }
        }
      });
      if (valdaitionarr.length) {
        return res
          .status(400)
          .json({ message: "validation error", valdaitionarr });
      }
    } catch (error) {
      res.status(500).json({ message: "catch error", err: error.message });
    }
  };
};
