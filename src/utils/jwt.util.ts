import jwt, { VerifyErrors, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Define a custom interface for the 'user' property after verification
interface VerifiedUser {
    user: string;
}

// Extend the default 'Request' type with the new 'UserRequest' type
interface UserRequest extends Request {
    user: VerifiedUser;
}

export const CreateTokens = (user: string): { accessToken: string; refreshToken: string } => {
    try {
        const accessToken = jwt.sign(user, 'veryverysecret', { expiresIn: "15m" });
        const refreshToken = jwt.sign(user, 'refreshsecret', { expiresIn: "7d" });
        return { accessToken, refreshToken };
    } catch (error) {
        // Handle error appropriately, e.g., log it or throw a custom error
        throw new Error("Failed to create tokens");
    }
};

export const VerifyAccessToken = (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'veryverysecret', (err, user) => {
        if (err) {
            return res.status(403).json({ status: 403, message: "Invalid Access Token" });
        }

        // Assert the type of 'user' to the custom interface after successful verification
        req.user = user as VerifiedUser;
        next();
    });
};

export const VerifyRefreshToken = (refreshToken: string): Promise<VerifiedUser> => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, 'refreshsecret', (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user as VerifiedUser);
            }
        });
    });
};
