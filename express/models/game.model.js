const patchHistory = require("mongoose-patch-history").default;

module.exports = (mongoose) => {
    const gameSchema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
                unique: true,
            },
            logo: {
                type: String,
                trim: true,
                default: function () {
                    if (this.name) {
                        return `https://avatars.dicebear.com/api/initials/${this.name
                            .trim()
                            .replace(/ /g, "-")}.svg`;
                    }
                    return null;
                },
            },
            description: {
                type: String,
            },
            rules: {
                type: String,
            },
            patron: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: false,
            },
            createdAt: {type: Date, default: Date.now},
            createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: false,
            },
            approvedAt: {type: Date},
            approvedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: false,
            },
            contests: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "contest",
            }],

            approved: {
                type: Boolean,
                default: false,
            },

        },
        {
            versionKey: false,
        }
    );

    gameSchema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object._id = _id;
        return object;
    });
    gameSchema.virtual("updatedBy").set(function (game) {
        this._updatedBy = game;
    });
    gameSchema.plugin(patchHistory, {
        mongoose,
        name: "gamePatches",
        includes: {
            updatedBy: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                from: "_updatedBy",
            },
        },
    });

    const Game = mongoose.model("game", gameSchema);
    return Game;
};
