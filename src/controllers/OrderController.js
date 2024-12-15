const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    console.log("req", req.body);
    const {
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
    } = req.body;
    if (
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !fullName ||
      !address ||
      !city ||
      !phone
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getAllOrderDetails(userId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getOrderDetails(orderId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const cancelOrderDetails = async (req, res) => {
  try {
    const data = req.body.orderItems;
    const orderId = req.body.orderId;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }
    const response = await OrderService.cancelOrderDetails(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const data = await OrderService.getAllOrder();
    return res.status(200).json(data);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Lấy ID đơn hàng từ params
    const updateData = req.body; // Lấy dữ liệu cần cập nhật từ body

    // Kiểm tra nếu không có ID hoặc dữ liệu cập nhật
    if (!orderId) {
      return res.status(400).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "ERR",
        message: "No data provided for update",
      });
    }

    // Gọi service để cập nhật đơn hàng
    const response = await OrderService.updateOrder(orderId, updateData);

    // Kiểm tra kết quả trả về
    if (response && response.modifiedCount === 0) {
      return res.status(404).json({
        status: "ERR",
        message: "Order not found or no changes made",
      });
    }

    return res.status(200).json({
      status: "OK",
      message: "Order updated successfully",
      data: response,
    });
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: "An error occurred while updating the order",
      error: e.message || e,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
  updateOrder,
};
