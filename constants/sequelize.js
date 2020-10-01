global.db = require('../models');
global.Users = db.users;
global.UsersStatuses = db.users_statuses;
global.sequelize = require('sequelize');
global.Roles = db.roles;
global.Ferries = db.ferries;
global.Tours = db.tours;
global.ToursType = db.tours_type;
global.PartnerTypes = db.partner_types;
global.FoodDrink = db.food_drink;
global.Activities = db.activities;
global.ActivityTypes = db.activity_types;
global.ActivitySubTypes = db.activity_subtypes;
global.ActivitiesTypes = db.activities_act_types;
global.Accommodations = db.accommodations;
global.Companies = db.companies;
global.Contacts = db.contacts;
global.Positions = db.positions;
global.Ratings = db.ratings;
global.FerryDirections = db.ferries_directions;
global.FerryDirectionsPricing = db.ferry_directions_pricings;
global.Op = sequelize.Op;
