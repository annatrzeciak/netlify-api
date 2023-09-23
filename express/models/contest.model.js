const patchHistory = require("mongoose-patch-history").default;

module.exports = (mongoose) => {
    const contestSchema = mongoose.Schema(
        {
            game: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "game",
                required: true,
            },
            title: {
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
                        return `https://avatars.dicebear.com/api/initials/${this.title
                            .trim()
                            .replace(/ /g, "-")}.svg`;
                    }
                    return null;
                },
            },
            poster: {
                type: String,
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
            approved: {
                type: Boolean,
                default: false,
            },
            date: {type: Date, required: true},
            maxPlayers: {type: Number, required: true},
            minPlayers: {type: Number, required: true},
            playersAtTable: {type: Number, required: true},

        },
        {
            versionKey: false,
        }
    );

    contestSchema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object._id = _id;
        return object;
    });
    contestSchema.virtual("updatedBy").set(function (contest) {
        this._updatedBy = contest;
    });
    contestSchema.plugin(patchHistory, {
        mongoose,
        name: "contestPatches",
        includes: {
            updatedBy: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                from: "_updatedBy",
            },
        },
    });

    const Contest = mongoose.model("contest", contestSchema);
    return Contest;
};
