const Pops = require("../models/Pops");

exports.getPops = (req, res) => {
    // gets all pops from db
    Pops.find({}, (err, allPops) => {
        if (err) {
            console.log("Error: " + err);
        } else {
            res.render("pops/index", { pops: allPops, title: "All Pops", currentUser: req.user });
        }
    });
}
exports.postPops = (req, res) => {
    //grabs data and adds it to pops array
    let name = req.body.name;
    let poptext = req.sanitize(req.body.poptext);
    let author = {
        id: req.user._id,
        username: req.user.username,
        avatar: req.user.avatar
    }
    let newPop = { name: name, poptext: poptext, author: author }
    // create new pop and save
    Pops.create(newPop, (err, newlyCreated) => {
        if (err) {
            console.log("Error: " + err);
        } else {
            res.redirect("/pops");
        }
    });
}
exports.getNewPop = (req, res) => {
    res.render("pops/newPop", { title: "Your Pop" })
}
exports.popById = (req, res) => {
    Pops.findById(req.params.id).populate("comments").exec((err, foundPop) => {
        if (err || !foundPop) {
            req.flash("error", "Pop not found");
            console.log("Error: " + err);
        } else {
            res.render("pops/show", { title: "Your Pop", pop: foundPop, currentUser: req.user });
        }
    });
}
exports.editPop = (req, res) => {
    Pops.findById(req.params.id, (err, foundPop) => {
        res.render("pops/edit", { pop: foundPop, title: "Edit" });
    });
}
exports.updatePop = (req, res) => {
    Pops.findByIdAndUpdate(req.params.id, req.body.pop, (err, updatedPop) => {
        if (err) {
            console.log("Error: " + err);
            res.redirect("/pops/edit");
        } else {
            req.flash("succes", "Pop Updated" + { pop: updatedPop });
            res.redirect("/pops/" + req.params.id);
        }
    });
}
exports.deletePop = (req, res) => {
    Pops.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (err) {
            console.log("Error: " + err);
            res.redirect("/pops");
        } else {
            console.log(req.params.id);
            res.redirect("/pops");
        }
    });
}