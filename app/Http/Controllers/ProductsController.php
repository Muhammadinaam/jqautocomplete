<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ProductsController extends Controller
{
    //
   	public function productSearch(Request $request)
   	{
   		return DB::table('products')->paginate(10);
   	}
}
