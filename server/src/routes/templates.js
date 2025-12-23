import { Router } from "express";
import { templates } from "../data/templateData.js";

const router = Router();

// Get all templates
router.get("/", (req, res) => {
    try {
        const { category, premium } = req.query;

        let filtered = [...templates];

        // Filter by category if provided
        if (category) {
            filtered = filtered.filter((t) => t.category === category);
        }

        // Filter by premium status if provided
        if (premium !== undefined) {
            const isPremium = premium === "true";
            filtered = filtered.filter((t) => t.isPremium === isPremium);
        }

        res.json({
            templates: filtered,
            total: filtered.length,
        });
    } catch (err) {
        console.error("Template fetch error:", err);
        res.status(500).json({ error: "Failed to fetch templates" });
    }
});

// Get template by ID
router.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const template = templates.find((t) => t.id === id);

        if (!template) {
            return res.status(404).json({ error: "Template not found" });
        }

        res.json(template);
    } catch (err) {
        console.error("Template fetch error:", err);
        res.status(500).json({ error: "Failed to fetch template" });
    }
});

// Get template categories
router.get("/meta/categories", (req, res) => {
    try {
        const categories = [...new Set(templates.map((t) => t.category))];
        res.json({ categories });
    } catch (err) {
        console.error("Categories fetch error:", err);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

export default router;
