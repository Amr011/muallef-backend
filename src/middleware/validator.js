const Joi = require('@hapi/joi');
const fs = require('fs');

// Section Validation
const sectionValidation = (data) => {
  const schema = {
    title: Joi.string().min(6).required().label('اسم القسم'),
    description: Joi.string().min(6).required('وصف القسم'),
  };
  return Joi.validate(data, schema);
};

// Category Validation
const categoryValidation = (data) => {
  const schema = {
    title: Joi.string().min(6).required().label('اسم الصنف'),
    description: Joi.string().min(6).required().label('وصف الصنف'),
    sectionId: Joi.required(),
  };
  return Joi.validate(data, schema);
};

// Sort Validation
const sortValidation = (data) => {
  const schema = {
    title: Joi.string().min(6).required().label('اسم الصنف'),
    description: Joi.string().min(6).required().label('وصف الصنف'),
    categoryId: Joi.required(),
  };
  return Joi.validate(data, schema);
};

const productValidation = (data) => {
  const schema = {
    title: Joi.string()
      .min(6)
      .required()
      .label('اسم المنتج')
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case 'any.empty':
              err.message = `! لا يمكن السماح ان يكون ${err.context.label} فارغاً`;
              break;
            case 'string.min':
              err.message = `! ${err.context.label} يجب ان تكون على الأقل ${err.context.limit} محارف`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),

    content: Joi.string()
      .min(6)
      .required()
      .label('الوصف الكامل للمنتج')
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case 'any.empty':
              err.message = `! لا يمكن السماح ان يكون ${err.context.label} فارغاً`;
              break;
            case 'string.min':
              err.message = `! ${err.context.label} يجب ان تكون على الأقل ${err.context.limit} محارف`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    coverImage: Joi.string(),
    // price: Joi.number()
    //   .required()
    //   .label("سعر المنتج")
    //   .min(1)
    //   .error((errors) => {
    //     errors.forEach((err) => {
    //       switch (err.type) {
    //         case "any.empty":
    //           err.message = `! لا يمكن السماح ان يكون ${err.context.label} فارغاً`;
    //           break;
    //         case "number.min":
    //           err.message = `! ${err.context.label} يجب ان تكون على الأقل ${err.context.limit} محارف`;
    //           break;
    //         default:
    //           break;
    //       }
    //     });
    //     return errors;
    //   }),
    previewURL: Joi.string().required(),
    isExclusive: Joi.boolean(),
    projectFile: Joi.string(),
    sortId: Joi.string().required(),
    supportPrice: Joi.number(),
    standardLicensePrice: Joi.number().required(),
    extendedLicensePrice: Joi.number().required(),
    name: Joi.string().required(),
    shortDescription: Joi.string(),
  };
  return Joi.validate(data, schema);
};

const fileUploadValdiation = (err, req, res, next) => {
  if (err.code === 'LIMIT_COVER_IMAGE_FILE_TYPES') {
    res.status(200).json({
      error: '! يمكن رفع الصور فقط',
    });
    return;
  }
  if (err.code === 'LIMIT_PROJECT_FILE_FILE_TYPES') {
    res.status(200).json({
      error: "! فقط 'rar' او 'zip' يمكن رفع ملف مضغوط بلاحقة",
    });
    return;
  }

  if (err.code === 'LIMIT_DOCUMENTATION_FILE_FILE_TYPES') {
    res.status(200).json({
      error: "! فقط 'pdf' يمكن رفع ملف ",
    });
    return;
  }

  next();
};

const userValidation = (data) => {
  const schema = {
    firstname: Joi.string().required().label('الأسم الأول'),
    lastname: Joi.string().required().label('الأسم الثاني'),
    email: Joi.string().min(3).required().email().label('البريد الالكتروني'),
    password: Joi.string().min(8).required().label('كلمة المرور'),
    phone: Joi.number().required().label('رقم الهاتف'),
  };
  return Joi.validate(data, schema);
};

const storeValidation = (data) => {
  const schema = {
    name: Joi.string().label('اسم المتجر'),
    description: Joi.string().label('وصف المتجر'),
    coverImage: Joi.string(),
  };
  return Joi.validate(data, schema);
};

module.exports = {
  storeValidation,
  sectionValidation,
  categoryValidation,
  sortValidation,
  fileUploadValdiation,
  productValidation,
  userValidation,
};
