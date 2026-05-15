const Bus = require('../models/Bus');
const Driver = require('../models/Driver');
const University = require('../models/University');
const Place = require('../models/Place');

exports.getAllBus = async (req, res) => {
  try {
    const buses = await Bus.find({ university: req.body.university }).populate('driver').populate('university');
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id)
      .populate('driver')
      .populate('university')
      .populate({
        path: "routes.points",
        select: "name"
      });

    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.addBus = async (req, res) => {
  try {
    const { busData, university } = req.body;
    // console.log(busData)
    const { busNo, numberPlate, driverId, shift, routes, lastServiced } = busData;

    // 1. Validate University
    const uni = await University.findById(university).select("_id");
    if (!uni) {
      return res.status(400).json({ msg: "University not found" });
    }


    // 2. Validate Driver
    const driver = await Driver.findById(driverId).select("_id");
    if (!driver) {
      return res.status(400).json({ msg: "Driver not found" });
    }
    // console.log(driver);

    // 3. Convert routes (place names -> ObjectIds)
    const formattedRoutes = [];

    for (const route of routes) {
      const { shift, startTime, points } = route;

      if (!shift || !startTime || !points?.length) {
        return res.status(400).json({ msg: "Invalid route format" });
      }
      // console.log(points)

      const pointIds = [];

      for (const pointName of points) {
        const place = await Place.findOne({
          name: pointName,
          university: uni._id
        }).select("_id");

        if (!place) {
          return res.status(400).json({
            msg: `Place not found: ${pointName}`
          });
        }

        pointIds.push(place._id);
      }

      formattedRoutes.push({
        shift,
        startTime,
        points: pointIds
      });
    }

    // 5. Create Bus
    const bus = await Bus.create({
      busNo,
      numberPlate,
      driver: driver._id,
      shift,
      routes: formattedRoutes,
      lastServiced,
      university: uni._id
    });

    res.status(201).json({
      msg: "Bus added successfully",
      bus
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ msg: "Bus not found" });
    }
    res.json({ msg: "Bus deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getForDriver = async (req, res) => {
  try {
    // console.log(req.body);
    const bus = await Bus.findOne({ driver: req.body.driver })
      .populate('driver')
      .populate({
        path: "routes.points",
        select: "name"
      });
    if (!bus) {
      return res.status(404).json({ msg: "No bus assigned to this driver" });
    }
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


exports.updateBus = async (req, res) => {
  try {

    const {
      busNo,
      numberPlate,
      driver,
      lastServiced,
      routes
    } = req.body;

    // convert routes
    const formattedRoutes = [];

    for (const route of routes) {

      const pointIds = [];

      for (const pointId of route.points) {

        const place = await Place.findById(pointId);

        if (!place) {
          return res.status(404).json({
            msg: "Place not found"
          });
        }

        pointIds.push(place._id);
      }

      formattedRoutes.push({
        shift: route.shift,
        startTime: route.startTime,
        points: pointIds
      });
    }

    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      {
        busNo,
        numberPlate,
        driver,
        lastServiced,
        routes: formattedRoutes
      },
      {
        returnDocument: "after"
      }
    )
      .populate("driver")
      .populate({
        path: "routes.points",
        select: "name"
      });

    if (!updatedBus) {
      return res.status(404).json({
        msg: "Bus not found"
      });
    }

    res.json({
      msg: "Bus updated successfully",
      bus: updatedBus
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });
  }
};  