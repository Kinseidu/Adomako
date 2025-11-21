import { NextFunction, Request, Response } from "express";
import { NewsletterSubscriber } from "../models/NewsletterSubscriber";
import { validateNewsletterInput } from "../validators/newsletter.validator";
import { sendSuccess } from "../utils/apiResponse";
import { sendEmail } from "../utils/sendEmail"; 

export const subscribeNewsletter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = validateNewsletterInput(req.body);

    let subscriber = await NewsletterSubscriber.findOne({ email: input.email });

    const isNewSubscriber = !subscriber || !subscriber.active;

    if (subscriber) {
      if (!subscriber.active) {
        subscriber.active = true;
        subscriber.subscribedAt = new Date();
        subscriber.unsubscribedAt = undefined;
        await subscriber.save();
      }
    } else {
      subscriber = await NewsletterSubscriber.create({
        email: input.email,
      });
    }

    // -----------------------------------------
    // 🚀 Send automatic welcome email
    // Only send if this is a NEW subscription
    // -----------------------------------------
    if (isNewSubscriber) {
      try {
        await sendEmail({
          to: subscriber.email,
          subject: "Welcome to our Newsletter!",
          html: `
            <h2>Thanks for subscribing! 🎉</h2>
            <p>We're excited to have you on board.</p>
            <p>You’ll now receive updates and exclusive content.</p>
          `,
        });
      } catch (emailError) {
        // Do not fail the subscription if email sending fails — log and continue
        // Common cause: mailer not configured in development
        // eslint-disable-next-line no-console
        console.error("Newsletter welcome email failed:", emailError);
      }
    }

    return sendSuccess(
      res,
      { id: subscriber.id, email: subscriber.email },
      "Subscription successful."
    );

  } catch (error) {
    return next(error);
  }
};
