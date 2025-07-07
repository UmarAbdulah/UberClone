const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*", // Consider replacing with frontend URL in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`✅ New client connected: ${socket.id}`);

    // JOIN EVENT
    socket.on("join", async (data) => {
      try {
        const { userId, userType } = data;
        console.log(`🧑‍💻 User joined: ${userId}, Type: ${userType}`);

        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (err) {
        console.error("❌ Error in join:", err.message);
        socket.emit("error", { message: "Join failed" });
      }
    });

    // LOCATION UPDATE EVENT
    socket.on("update-location-captain", async (data) => {
      try {
        const { captainId, location } = data;

      if (!location || location.ltd == null || location.lng == null) {
        return socket.emit("error", { message: "❌ Incomplete location data" });
        }
        console.log(`📍 Updating location for captain ${captainId}:`, location);


        const updatedCaptain = await captainModel.findByIdAndUpdate(captainId, {
            location: {
                type: "Point",
                coordinates: [location.lng, location.ltd]
            }
            });

        if (!updatedCaptain) {
          return socket.emit("error", { message: "Captain not found" });
        }

        io.emit("captain-location-updated", { captainId, location });
      } catch (err) {
        console.error("❌ Error updating location:", err.message);
        socket.emit("error", { message: "Location update failed" });
      }
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });

    // OPTIONAL: Custom Events
    socket.on("custom-event", (data) => {
      console.log("🎯 Received custom-event:", data);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("❌ Socket.io is not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
