"use strict";

const mongoose = require("mongoose");

const TicketInformationSchema = new mongoose.Schema(
	{
		fullPrice: Number,
		maxCoveredPeople: Number,
		initialFreeSlotsLeft: Number,

		// EventInformation
		eventInformation: mongoose.Types.ObjectId,

		// currency
		currency: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "currency",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("ticketInformation", TicketInformationSchema);
