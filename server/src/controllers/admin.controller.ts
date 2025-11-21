import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/apiResponse";

export const getAdminSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Minimal summary for now: counts. Later replace with aggregation queries.
    const summary = {
      donations: 0,
      volunteers: 0,
      partners: 0,
      news: 0,
      pendingApplications: 0,
    };

    return sendSuccess(res, summary, "Admin summary fetched.");
  } catch (error) {
    return next(error);
  }
};
