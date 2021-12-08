"use strict";

const Vacations = require("../models/vacation"),
  httpStatus = require("http-status-codes"),
  User = require("../models/user"),
  getVacationsParams = body => {
    return {
      title: body.title,
      description: body.description,
      heroImage: body.heroImage,
      cuisine: body.cuisine,
      cost: body.cost,
      maxTravelers: body.maxTravelers,
      destination: body.destination,
      departureLocation: body.departureLocation,
      departureDate: body.departureDate,
      returnDate: body.returnDate
    };
  };

module.exports = {
  index: (req, res, next) => {
    Vacations.find()
      .then(vacations => {
        res.locals.vacations = vacations;
        next();
      })
      .catch(error => {
        console.log(`Error fetching vacations: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("vacations/index");
  },

  new: (req, res) => {
    res.render("vacations/new");
  },

  // Vacation Create Function
  create: (req, res, next) => {
    let vacationsParams = getVacationsParams(req.body);
    Vacations.create(vacationsParams)
      .then(vacations => {
        res.locals.redirect = "/vacations";
        res.locals.vacations = vacations;
        next();
      })
      .catch(error => {
        console.log(`Error saving vacations: ${error.message}`);
        next(error);
      });
      let date1= vacationsParams.departureDate;
      let date2= vacationsParams.returnDate;
      console.log('Date 1 and 2');
      console.log(date1);
      console.log(date2);
      if(date1 > date2)
      {
        next(error);
      }    
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let vacationsId = req.params.id;
    Vacations.findById(vacationsId)
      .then(vacations => {
        res.locals.vacations = vacations;
        next();
      })
      .catch(error => {
        console.log(`Error fetching vacations by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("vacations/show");
  },

  edit: (req, res, next) => {
    let vacationsId = req.params.id;
    Vacations.findById(vacationsId)
      .then(vacations => {
        res.render("vacations/edit", {
          vacations: vacations
        });
      })
      .catch(error => {
        console.log(`Error fetching vacations by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let vacationsId = req.params.id,
      vacationsParams = getVacationsParams(req.body);

    Vacations.findByIdAndUpdate(vacationsId, {
      $set: vacationsParams
    })
      .then(vacations => {
        res.locals.redirect = `/vacations/${vacationsId}`;
        res.locals.vacations = vacations;
        next();
      })
      .catch(error => {
        console.log(`Error updating vacations by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let vacationsId = req.params.id;
    Vacations.findByIdAndRemove(vacationsId)
      .then(() => {
        res.locals.redirect = "/vacations";
        next();
      })
      .catch(error => {
        console.log(`Error deleting vacations by ID: ${error.message}`);
        next();
      });
  },
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },
  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.OK,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },
  filterUservacations: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedvacations = res.locals.vacations.map(vacations => {
        let userJoined = currentUser.vacations.some(userVacations => {
          return userVacations.equals(vacations._id);
        });
        return Object.assign(vacations.toObject(), { joined: userJoined });
      });
      res.locals.vacations = mappedvacations;
      next();
    } else {
      next();
    }
  },
  join: (req, res, next) => {
    let vacationsId = req.params.id,
      currentUser = req.user;
    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          vacations: vacationsId
        }
      })
        .then(() => {
          res.locals.success = true;
          next();
        })
        .catch(error => {
          next(error);
        });
    } else {
      next(new Error("User must log in."));
    }
  }
};
