const { CourseMaterials } = require("../models");
const errMsg = require("../utilities/errorMessages");
const { getRandomId } = require("../utilities/getRandomId");

module.exports = {
  async addNewMaterial(payload) {
    const materialId = getRandomId(13);

    const topic = await CourseMaterials.create({
      material_id: materialId,
      ...payload,
    });

    return topic;
  },

  async getTopicMaterials(topicSecretId, isPurchased) {
    const query = {
      where: { topic_id: topicSecretId },
    };

    if (!isPurchased) query.attributes = ["material_id", "title"];

    return await CourseMaterials.findAll(query);
  },

  async updateTopicMaterial(materialId, payload) {
    await CourseMaterials.update(payload, { where: { material_id: materialId } });
  },

  async deleteAllTopicMaterials(topicId) {
    await CourseMaterials.destroy({ where: { topic_id: topicId } });
  },

  async deleteCourseMaterial(materialId) {
    await CourseMaterials.destroy({ where: { material_id: materialId } });
  },

  async getTopicMaterial(materialId) {
    const material = await CourseMaterials.findOne({
      where: { material_id: materialId },
    });

    if (!material) throw errMsg.notFound("Material");
    return material;
  },
};
