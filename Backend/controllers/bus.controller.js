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
    const bus = await Bus.findOne({ busId: req.params.id, university: req.params.universityId }).populate('driver').populate('university');
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.addBus = async (req, res) => {
  try {
    const { busData, university } = req.body;
    console.log(busData)
    const { busNo, numberPlate, driverId, shift, routes, lastServiced } = busData;

    // 1. Validate University
    const uni = await University.findById(university).select("_id");
    if (!uni) {
      return res.status(400).json({ msg: "University not found" });
    }
    console.log(uni);
    
    
    // 2. Validate Driver
    const driver = await Driver.findById(driverId).select("_id");
    if (!driver) {
      return res.status(400).json({ msg: "Driver not found" });
    }
    console.log(driver);

    // 3. Convert routes (place names -> ObjectIds)
    const formattedRoutes = [];

    for (const route of routes) {
      const { shift, startTime, points } = route;

      if (!shift || !startTime || !points?.length) {
        return res.status(400).json({ msg: "Invalid route format" });
      }
      console.log(points)

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