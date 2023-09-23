const patchHistory = require("mongoose-patch-history").default;

module.exports = (mongoose) => {
  const roleSchema = mongoose.Schema({
    name: String,
  });

  roleSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object._id = _id;
    return object;
  });
  roleSchema.virtual("user").set(function (user) {
    this._user = user;
  });
  roleSchema.plugin(patchHistory, {
    mongoose,
    name: "rolePatches",
    includes: {
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        from: "_user",
      },
    },
  });
  const Role = mongoose.model("role", roleSchema);
  return Role;
};
