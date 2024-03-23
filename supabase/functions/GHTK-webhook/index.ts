import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase_url = Deno.env.get("PUBLIC_SUPABASE_URL") ?? "";
    const supabase_key = Deno.env.get("PUBLIC_SUPABASE_ANON_KEY") ?? "";

    const supabase = createClient(supabase_url, supabase_key);

    const data = await req.json();

    const labelId = data.label_id;
    const statusId = data.status_id;

    let updatedState:
      | "pending"
      | "shipping"
      | "delivered"
      | "canceled"
      | "returned"
      | null = null;

    if (Number(statusId) === -1) {
      updatedState = "canceled";
    } else if (1 <= Number(statusId) && Number(statusId) <= 3) {
      updatedState = "pending";
    } else if (Number(statusId) === 4) {
      updatedState = "shipping";
    } else if (Number(statusId) === 5 || Number(statusId) === 45) {
      updatedState = "delivered";
    } else if (Number(statusId) === 21) {
      updatedState = "returned";
    } else {
      updatedState = "pending";
    }

    const { data: responseData, error } = await supabase
      .from("order")
      .update({ state: updatedState })
      .eq("shipment_label_code", labelId.toString());

    return new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// *** GTTK order state code request ***

// -1	Hủy đơn hàng
// 1	Chưa tiếp nhận
// 2	Đã tiếp nhận
// 3	Đã lấy hàng/Đã nhập kho
// 4	Đã điều phối giao hàng/Đang giao hàng
// 5	Đã giao hàng/Chưa đối soát
// 6	Đã đối soát
// 7	Không lấy được hàng
// 8	Hoãn lấy hàng
// 9	Không giao được hàng
// 10	Delay giao hàng
// 11	Đã đối soát công nợ trả hàng
// 12	Đã điều phối lấy hàng/Đang lấy hàng
// 13	Đơn hàng bồi hoàn
// 20	Đang trả hàng (COD cầm hàng đi trả)
// 21	Đã trả hàng (COD đã trả xong hàng)
// 45	Shipper báo đã giao hàng-
// 49	Shipper báo không giao được giao hàng
// 123 Shipper báo đã lấy hàng
// 127 Shipper (nhân viên lấy/giao hàng) báo không lấy được hàng
// 128 Shipper báo delay lấy hàng
// 410 Shipper báo delay giao hàng
